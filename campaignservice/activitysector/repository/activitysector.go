package repository

import (
	"context"
	"errors"

	"github.com/google/uuid"
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

func (r *ActivitySectorRepository) GetActivitySector(ctx context.Context, id uuid.UUID) (*models.ActivitySector, error) {
	var activitySector models.ActivitySector
	if err := r.db.Preload("Advantages").First(&activitySector, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			r.logger.Info("ActivitySector not found", zap.Error(err))
			return nil, nil
		}
	}
	return &activitySector, nil
}

func (r *ActivitySectorRepository) GetActivitySectors(ctx context.Context) ([]*models.ActivitySector, error) {
	var activitySectors []*models.ActivitySector
	if err := r.db.Preload("Advantages").Find(&activitySectors).Error; err != nil {
		r.logger.Info("Failed to get activity sectors", zap.Error(err))
		return nil, err
	}
	return activitySectors, nil
}

func (r *ActivitySectorRepository) CreateActivitySector(ctx context.Context, activitySector *models.ActivitySector, advantages []*models.Advantage) (*models.ActivitySector, error) {
	if err := r.db.Create(&activitySector).Error; err != nil {
		r.logger.Info("Failed to create activity sector", zap.Error(err))
		return nil, err
	}

	for _, advantage := range advantages {
		if err := r.db.First(&advantage).Error; err != nil {
			return nil, err
		}
		if err := r.db.Model(activitySector).Association("Advantages").Append(advantage); err != nil {
			return nil, err
		}
	}

	return activitySector, nil
}

func (r *ActivitySectorRepository) UpdateActivitySector(ctx context.Context, activitySector *models.ActivitySector, advantages []*models.Advantage) (*models.ActivitySector, error) {
	if err := r.db.Preload("Advantages").Save(&activitySector).Error; err != nil {
		r.logger.Info("Failed to update activity sector", zap.Error(err))
		return nil, err
	}

	for _, advantage := range advantages {
		if err := r.db.Model(activitySector).Association("Advantages").Append(advantage); err != nil {
			return nil, err
		}
	}

	return activitySector, nil
}

func (r *ActivitySectorRepository) DeleteActivitySector(ctx context.Context, id uuid.UUID) error {
	if err := r.db.Delete(&models.ActivitySector{}, id).Error; err != nil {
		r.logger.Info("Failed to delete activity sector", zap.Error(err))
		return err
	}
	return nil
}
