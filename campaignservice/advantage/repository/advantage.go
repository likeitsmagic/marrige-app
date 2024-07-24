package repository

import (
	"context"

	"github.com/google/uuid"
	"github.com/moyasvadba/campaignservice/internal/logger"
	"github.com/moyasvadba/campaignservice/models"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type AdvantageRepository struct {
	DB     *gorm.DB
	logger *logger.Logger
}

func NewAdvantageRepository(db *gorm.DB, logger *logger.Logger) *AdvantageRepository {
	return &AdvantageRepository{DB: db, logger: logger}
}

func (r *AdvantageRepository) Create(ctx context.Context, advantage *models.Advantage) (*models.Advantage, error) {
	err := r.DB.Create(&advantage).Error
	if err != nil {
		r.logger.Info("Error creating advantage", zap.Error(err))
		return nil, err
	}
	return advantage, nil
}

func (r *AdvantageRepository) CreateMany(ctx context.Context, advantages []*models.Advantage) ([]*models.Advantage, error) {
	err := r.DB.Create(&advantages).Error
	if err != nil {
		r.logger.Info("Error creating advantages", zap.Error(err))
		return nil, err
	}
	return advantages, nil
}

func (r *AdvantageRepository) GetAll(ctx context.Context) ([]*models.Advantage, error) {
	var advantages []*models.Advantage
	err := r.DB.Find(&advantages).Error
	if err != nil {
		r.logger.Info("Error getting advantages", zap.Error(err))
		return nil, err
	}
	return advantages, nil
}

func (r *AdvantageRepository) GetByID(ctx context.Context, id uuid.UUID) (*models.Advantage, error) {
	var advantage models.Advantage
	err := r.DB.First(&advantage, id).Error
	if err != nil {
		r.logger.Info("Error getting advantage", zap.Error(err))
		return nil, err
	}
	return &advantage, nil
}

func (r *AdvantageRepository) GetByType(ctx context.Context, t string) ([]*models.Advantage, error) {
	var advantages []*models.Advantage
	err := r.DB.Where("type = ?", t).Find(&advantages).Error
	if err != nil {
		r.logger.Info("Error getting advantage", zap.Error(err))
		return nil, err
	}
	return advantages, nil
}

func (r *AdvantageRepository) Update(ctx context.Context, advantage *models.Advantage) error {

	err := r.DB.Save(&advantage).Error
	if err != nil {
		r.logger.Info("Error updating advantage", zap.Error(err))
		return err
	}
	return nil
}

func (r *AdvantageRepository) Delete(ctx context.Context, id uuid.UUID) error {
	err := r.DB.Delete(&models.Advantage{}, id).Error
	if err != nil {
		r.logger.Info("Error deleting advantage", zap.Error(err))
		return err
	}
	return nil
}

func (r *AdvantageRepository) DeleteMany(ctx context.Context, ids []uuid.UUID) error {
	err := r.DB.Delete(&models.Advantage{}, ids).Error
	if err != nil {
		r.logger.Info("Error deleting advantages", zap.Error(err))
		return err
	}
	return nil
}

func (r *AdvantageRepository) GetByIDs(ctx context.Context, ids []uuid.UUID) ([]*models.Advantage, error) {
	var advantages []*models.Advantage
	err := r.DB.Where("id IN (?)", ids).Find(&advantages).Error
	if err != nil {
		r.logger.Info("Error getting advantages", zap.Error(err))
		return nil, err
	}
	return advantages, nil
}
