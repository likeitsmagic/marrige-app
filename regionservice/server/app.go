package server

import (
	"fmt"
	"net"
	"os"
	"os/signal"

	"github.com/moyasvadba/regionservice/internal/config"
	"github.com/moyasvadba/regionservice/internal/logger"
	"github.com/moyasvadba/regionservice/internal/repository"
	"github.com/moyasvadba/regionservice/models"
	regiongrpc "github.com/moyasvadba/regionservice/region/delivery/grpc"
	regiongorm "github.com/moyasvadba/regionservice/region/repository/gorm"
	regionusecase "github.com/moyasvadba/regionservice/region/usecase"
	"go.uber.org/zap"
	"google.golang.org/grpc"

	"gorm.io/gorm"
)

type App struct {
	grpcServer *grpc.Server
	logger     *logger.Logger
	regionUC   *regionusecase.RegionUsecase
}

func NewApp(cfg *config.Config, logger *logger.Logger) *App {
	db := initDB(cfg)

	err := db.AutoMigrate(&models.Region{})
	if err != nil {
		logger.Error("failed to migrate database", zap.Error(err))
	}

	regionRepo := regiongorm.NewRegionRepository(db, logger)


	return &App{
		logger:     logger,
		regionUC:   regionusecase.NewRegionUsecase(regionRepo, logger),
	}
}

func (a *App) Run() error {
	lis, err := net.Listen("tcp", ":50052")
	if err != nil {
		a.logger.Fatal("failed to listen on port 50052", zap.Error(err))
	}

	a.grpcServer = grpc.NewServer()
	regiongrpc.RegisterGrpcServer(a.grpcServer, a.regionUC)
	
	go func() {
		if err := a.grpcServer.Serve(lis); err != nil {
			a.logger.Fatal("failed to serve gRPC", zap.Error(err))
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, os.Interrupt)

	<-quit

	a.grpcServer.GracefulStop()

	return nil
}

func initDB(cfg *config.Config) *gorm.DB {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai",
		cfg.PostgresHost, cfg.PostgresUser, cfg.PostgresPassword, cfg.PostgresDb, cfg.PostgresPort)

	db := repository.NewRepository(dsn)
	return db.DB
}
