package server

import (
	"context"
	"fmt"
	"net"
	"net/http"
	"os"
	"os/signal"
	"sync"
	"time"

	ginzap "github.com/gin-contrib/zap"
	"github.com/moyasvadba/userservice/auth"
	authgrpc "github.com/moyasvadba/userservice/auth/delivery/grpc"
	authhttp "github.com/moyasvadba/userservice/auth/delivery/http"
	authgorm "github.com/moyasvadba/userservice/auth/repository/gorm"
	authusecase "github.com/moyasvadba/userservice/auth/usecase"
	"github.com/moyasvadba/userservice/internal/config"
	"github.com/moyasvadba/userservice/internal/locale"
	"github.com/moyasvadba/userservice/internal/logger"
	"github.com/moyasvadba/userservice/internal/repository"
	"github.com/moyasvadba/userservice/internal/token"
	"github.com/moyasvadba/userservice/models"
	permissiongorm "github.com/moyasvadba/userservice/permission/repository/gorm"
	"go.uber.org/zap"
	"google.golang.org/grpc"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type App struct {
	httpServer *http.Server
	grpcServer *grpc.Server
	corsConfig cors.Config
	authUC     auth.UseCase
	jwtService *token.JWTService
	logger     *logger.Logger
}

func NewApp(cfg *config.Config, logger *logger.Logger) *App {
	db := initDB(cfg)

	err := db.AutoMigrate(&models.User{}, &models.Permission{}, &models.RefreshToken{})
	if err != nil {
		logger.Error("failed to migrate database", zap.Error(err))
	}

	corsConfig := cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", fmt.Sprintf("https://%s", cfg.Domain)},
		AllowCredentials: true,
		AllowHeaders:     []string{"Content-Type", "Authorization", "Accept-Language"},
	}

	jwtService := token.NewJWTService(cfg)

	userRepo := authgorm.NewUserRepository(db, logger)
	permissionRepo := permissiongorm.NewPermissionRepository(db, logger)
	return &App{
		corsConfig: corsConfig,
		authUC:     authusecase.NewAuthUseCase(userRepo, permissionRepo, jwtService, logger),
		jwtService: jwtService,
		logger:     logger,
	}
}

func (a *App) Run() error {
	router := gin.Default()
	router.Use(
		gin.Recovery(),
		ginzap.Ginzap(a.logger, time.RFC3339, true),
		cors.New(a.corsConfig),
		locale.LocaleMiddleware(),
	)

	authhttp.RegisterHTTPEndpoints(router, a.authUC, a.jwtService, a.logger)

	// HTTP Server
	a.httpServer = &http.Server{
		Addr:           ":8080",
		Handler:        router,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	var wg sync.WaitGroup
	wg.Add(2)

	go func() {
		defer wg.Done()
		if err := a.httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			a.logger.Fatal("Failed to listen and serve HTTP: %+v", zap.Error(err))
		}
	}()

	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		a.logger.Fatal("failed to listen on port 50051", zap.Error(err))
	}

	a.grpcServer = grpc.NewServer()
	authgrpc.RegisterGrpcServer(a.grpcServer, a.authUC)

	go func() {
		defer wg.Done()
		if err := a.grpcServer.Serve(lis); err != nil {
			a.logger.Fatal("failed to serve gRPC", zap.Error(err))
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, os.Interrupt)

	<-quit

	ctx, shutdown := context.WithTimeout(context.Background(), 5*time.Second)
	defer shutdown()

	if err := a.httpServer.Shutdown(ctx); err != nil {
		a.logger.Fatal("HTTP server Shutdown", zap.Error(err))
	}
	a.grpcServer.GracefulStop()

	wg.Wait()
	return nil
}

func initDB(cfg *config.Config) *gorm.DB {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai",
		cfg.PostgresHost, cfg.PostgresUser, cfg.PostgresPassword, cfg.PostgresDb, cfg.PostgresPort)

	db := repository.NewRepository(dsn)
	return db.DB
}
