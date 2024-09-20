package gorm

import (
	"context"

	"github.com/google/uuid"
	"github.com/moyasvadba/regionservice/internal/logger"
	"github.com/moyasvadba/regionservice/models"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type RegionRepository struct {
	db *gorm.DB
	logger *logger.Logger
}

func NewRegionRepository(db *gorm.DB, logger *logger.Logger) *RegionRepository {
	return &RegionRepository{db: db, logger: logger}
}

func (r *RegionRepository) Create(ctx context.Context, region *models.Region) (*models.Region, error) {
	result := r.db.Create(&region)
	if result.Error != nil {
		r.logger.Error("Error creating region", zap.Error(result.Error))
		return nil, result.Error
	}
	return region, nil
}

func (r *RegionRepository) GetByID(ctx context.Context, id uuid.UUID) (*models.Region, error) {
	region := &models.Region{}
	result := r.db.First(&region, "id = ?", id)
	if result.Error != nil {
		r.logger.Error("Error getting region by id", zap.Error(result.Error))
		return nil, result.Error
	}
	return region, nil
}