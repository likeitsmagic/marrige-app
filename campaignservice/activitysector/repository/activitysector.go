package repository

import (
	"errors"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/moyasvadba/campaignservice/activitysector"
	"github.com/moyasvadba/campaignservice/advantage"
	"github.com/moyasvadba/campaignservice/internal/logger"
	"github.com/moyasvadba/campaignservice/models"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type ActivitySectorRepository struct {
	db     *gorm.DB
	logger *logger.Logger
}

func NewActivitySectorRepository(db *gorm.DB, logger *logger.Logger) *ActivitySectorRepository {
	return &ActivitySectorRepository{db: db, logger: logger}
}

func (r *ActivitySectorRepository) GetActivitySector(ctx *gin.Context, id uuid.UUID) (activitysector.ActivitySector, error) {
	var activitySector activitysector.ActivitySector
	if err := r.db.Model(&models.ActivitySector{}).Preload("Advantages").First(&activitySector, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			r.logger.Info("ActivitySector not found", zap.Error(err))
			return activitysector.ActivitySector{}, nil
		}
	}
	return activitySector, nil
}

func (r *ActivitySectorRepository) GetActivitySectors(ctx *gin.Context) ([]activitysector.ActivitySector, error) {
	locale, ok := ctx.Get("locale")
	if !ok || locale == "" {
		r.logger.Error("Error retrieving value from context")
		return nil, errors.New("error retrieving value from context")
	}

	var activitySectors []activitysector.ActivitySector
	if err := r.db.Model(&models.ActivitySector{}).Preload("Advantages", func(db *gorm.DB) *gorm.DB {
		return db.Select(fmt.Sprintf("id, type, name_%s as name", locale))
	}).Find(&activitySectors).Error; err != nil {
		r.logger.Info("Failed to get activity sectors", zap.Error(err))
		return nil, err
	}
	return activitySectors, nil
}

func (r *ActivitySectorRepository) CreateActivitySector(ctx *gin.Context, activitySector *models.ActivitySector, advantages []advantage.Advantage) (*models.ActivitySector, error) {
	if err := r.db.Create(&activitySector).Error; err != nil {
		r.logger.Info("Failed to create activity sector", zap.Error(err))
		return nil, err
	}

	for _, advantage := range advantages {
		if err := r.db.Model(activitySector).Association("Advantages").Append(&models.Advantage{ID: advantage.ID}); err != nil {
			return nil, err
		}
	}

	return activitySector, nil
}

func (r *ActivitySectorRepository) UpdateActivitySector(ctx *gin.Context, activitySector activitysector.ActivitySector, advantages []advantage.Advantage) (*models.ActivitySector, error) {
	activitySectorModel := models.ActivitySector{
		ID:        activitySector.ID,
		Name:      activitySector.Name,
		Advantages: []models.Advantage{},
	}
	if err := r.db.Preload("Advantages").Save(&activitySectorModel).Error; err != nil {
		r.logger.Info("Failed to update activity sector", zap.Error(err))
		return nil, err
	}

	for _, advantage := range advantages {
		if err := r.db.Model(activitySector).Association("Advantages").Append(&models.Advantage{ID: advantage.ID}); err != nil {
			return nil, err
		}
	}

	return &activitySectorModel, nil
}

func (r *ActivitySectorRepository) DeleteActivitySector(ctx *gin.Context, id uuid.UUID) error {
	if err := r.db.Delete(&models.ActivitySector{}, id).Error; err != nil {
		r.logger.Info("Failed to delete activity sector", zap.Error(err))
		return err
	}
	return nil
}
