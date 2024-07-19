package server

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	ginzap "github.com/gin-contrib/zap"
	"github.com/moyasvadba/userservice/auth"
	authhttp "github.com/moyasvadba/userservice/auth/delivery/http"
	authgorm "github.com/moyasvadba/userservice/auth/repository/gorm"
	authusecase "github.com/moyasvadba/userservice/auth/usecase"
	"github.com/moyasvadba/userservice/internal/config"
	"github.com/moyasvadba/userservice/internal/logger"
	"github.com/moyasvadba/userservice/internal/repository"
	"github.com/moyasvadba/userservice/internal/token"
	"github.com/moyasvadba/userservice/models"
	"go.uber.org/zap"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type App struct {
	httpServer *http.Server
	corsConfig cors.Config
	authUC     auth.UseCase
	logger     *zap.Logger
}

func NewApp(cfg *config.Config) *App {
	db := initDB(cfg)

	err := db.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}

	corsConfig := cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "https://mayna-system.ru"},
		AllowCredentials: true,
		AllowHeaders:     []string{"Content-Type", "Authorization"},
	}

	jwtService := token.NewJWTService(cfg)

	userRepo := authgorm.NewUserRepository(db)

	return &App{
		corsConfig: corsConfig,
		authUC:     authusecase.NewAuthUseCase(userRepo, *jwtService),
		logger:     logger.NewLogger(cfg).Logger,
	}
}

func (a *App) Run() error {
	router := gin.Default()
	router.Use(
		gin.Recovery(),
		ginzap.Ginzap(a.logger, time.RFC3339, true),
		cors.New(a.corsConfig),
	)

	apiGroup := router.Group("/api/users")

	authhttp.RegisterHTTPEndpoints(apiGroup, a.authUC)

	// HTTP Server
	a.httpServer = &http.Server{
		Addr:           ":8080",
		Handler:        router,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	go func() {
		if err := a.httpServer.ListenAndServe(); err != nil {
			log.Fatalf("Failed to listen and serve: %+v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, os.Interrupt)

	<-quit

	ctx, shutdown := context.WithTimeout(context.Background(), 5*time.Second)
	defer shutdown()

	return a.httpServer.Shutdown(ctx)
}

func initDB(cfg *config.Config) *gorm.DB {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai",
		cfg.PostgresHost, cfg.PostgresUser, cfg.PostgresPassword, cfg.PostgresDb, cfg.PostgresPort)

	db := repository.NewRepository(dsn)
	return db.DB
}
