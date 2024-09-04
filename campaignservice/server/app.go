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
	"github.com/moyasvadba/campaignservice/activitysector"
	activitysectorhttp "github.com/moyasvadba/campaignservice/activitysector/delivery/http"
	activitysectorgorm "github.com/moyasvadba/campaignservice/activitysector/repository"
	activitysectorusecase "github.com/moyasvadba/campaignservice/activitysector/usecase"
	"github.com/moyasvadba/campaignservice/advantage"
	advantagehttp "github.com/moyasvadba/campaignservice/advantage/delivery/http"
	advantagegorm "github.com/moyasvadba/campaignservice/advantage/repository"
	advantageusecase "github.com/moyasvadba/campaignservice/advantage/usecase"
	"github.com/moyasvadba/campaignservice/campaign"
	campaignhttp "github.com/moyasvadba/campaignservice/campaign/delivery/http"
	campaigngorm "github.com/moyasvadba/campaignservice/campaign/repository"
	campaignusecase "github.com/moyasvadba/campaignservice/campaign/usecase"
	"github.com/moyasvadba/campaignservice/internal/config"
	"github.com/moyasvadba/campaignservice/internal/logger"
	"github.com/moyasvadba/campaignservice/internal/repository"
	"github.com/moyasvadba/campaignservice/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type App struct {
	httpServer       *http.Server
	corsConfig       cors.Config
	logger           *logger.Logger
	advantageUC      advantage.UseCase
	activitySectorUC activitysector.UseCase
	campaignUC       campaign.UseCase
}

func NewApp(cfg *config.Config, logger *logger.Logger) *App {
	db := initDB(cfg)

	err := db.AutoMigrate(&models.Advantage{}, &models.ActivitySector{}, &models.Campaign{})
	if err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}

	corsConfig := cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", fmt.Sprintf("https://%s", cfg.Domain)},
		AllowCredentials: true,
		AllowHeaders:     []string{"Content-Type", "Authorization", "Accept-Language"},
	}

	advantageRepo := advantagegorm.NewAdvantageRepository(db, logger)
	activitySectorRepo := activitysectorgorm.NewActivitySectorRepository(db, logger)
	campaignRepo := campaigngorm.NewCampaignRepository(db, logger)

	return &App{
		advantageUC:      advantageusecase.NewAdvantageUseCase(advantageRepo),
		activitySectorUC: activitysectorusecase.NewActivitySectorUsecase(activitySectorRepo, advantageRepo, logger),
		campaignUC: campaignusecase.NewCampaignUseCase(campaignRepo),
		corsConfig:       corsConfig,
		logger:           logger,
	}
}

func (a *App) Run() error {
	router := gin.Default()
	router.Use(
		gin.Recovery(),
		ginzap.Ginzap(a.logger, time.RFC3339, true),
		cors.New(a.corsConfig),
	)


	advantagehttp.RegisterHTTPEndpoints(router, a.advantageUC)
	activitysectorhttp.RegisterHTTPEndpoints(router, a.activitySectorUC)
	campaignhttp.RegisterHTTPEndpoints(router, a.campaignUC)

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
