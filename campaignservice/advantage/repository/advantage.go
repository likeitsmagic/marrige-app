package repository

import (
	"errors"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/moyasvadba/campaignservice/advantage"
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

func (r *AdvantageRepository) Create(ctx *gin.Context, advantage *models.Advantage) (*models.Advantage, error) {
	err := r.DB.Create(&advantage).Error
	if err != nil {
		r.logger.Info("Error creating advantage", zap.Error(err))
		return nil, err
	}
	return advantage, nil
}

func (r *AdvantageRepository) CreateMany(ctx *gin.Context, advantages []*models.Advantage) ([]*models.Advantage, error) {
	err := r.DB.Create(&advantages).Error
	if err != nil {
		r.logger.Info("Error creating advantages", zap.Error(err))
		return nil, err
	}
	return advantages, nil
}

func (r *AdvantageRepository) GetAll(ctx *gin.Context) ([]advantage.Advantage, error) {
	locale, ok := ctx.Get("locale")
	if !ok || locale == "" {
		r.logger.Error("Error retrieving value from context")
		return nil, errors.New("error retrieving value from context")
	}

	var advantages []advantage.Advantage
	err := r.DB.Model(&models.Advantage{}).Select(fmt.Sprintf("id, type, name_%s as name", locale)).Scan(&advantages).Error
	if err != nil {
		r.logger.Info("Error getting advantages", zap.Error(err))
		return nil, err
	}
	return advantages, nil
}

func (r *AdvantageRepository) GetByID(ctx *gin.Context, id uuid.UUID) (advantage.Advantage, error) {
	locale, ok := ctx.Get("locale")
	if !ok || locale == "" {
		r.logger.Error("Error retrieving value from context")
		return advantage.Advantage{}, errors.New("error retrieving value from context")
	}

	var advantage advantage.Advantage
	err := r.DB.Model(&models.Advantage{}).Select(fmt.Sprintf("id, type, name_%s as name", locale)).First(&advantage, id).Error
	if err != nil {
		r.logger.Info("Error getting advantage", zap.Error(err))
		return advantage, err
	}
	return advantage, nil
}

func (r *AdvantageRepository) GetByType(ctx *gin.Context, t string) ([]advantage.Advantage, error) {
	locale, ok := ctx.Get("locale")
	if !ok || locale == "" {
		r.logger.Error("Error retrieving value from context")
		return nil, errors.New("error retrieving value from context")
	}

	var advantages []advantage.Advantage
	err := r.DB.Model(&models.Advantage{}).Select(fmt.Sprintf("id, type, name_%s as name", locale)).Where("type = ?", t).Find(&advantages).Error
	if err != nil {
		r.logger.Info("Error getting advantage", zap.Error(err))
		return nil, err
	}
	return advantages, nil
}

func (r *AdvantageRepository) Update(ctx *gin.Context, advantage *models.Advantage) error {

	err := r.DB.Save(&advantage).Error
	if err != nil {
		r.logger.Info("Error updating advantage", zap.Error(err))
		return err
	}
	return nil
}

func (r *AdvantageRepository) Delete(ctx *gin.Context, id uuid.UUID) error {
	err := r.DB.Delete(&models.Advantage{}, id).Error
	if err != nil {
		r.logger.Info("Error deleting advantage", zap.Error(err))
		return err
	}
	return nil
}

func (r *AdvantageRepository) DeleteMany(ctx *gin.Context, ids []uuid.UUID) error {
	err := r.DB.Delete(&models.Advantage{}, ids).Error
	if err != nil {
		r.logger.Info("Error deleting advantages", zap.Error(err))
		return err
	}
	return nil
}

func (r *AdvantageRepository) GetByIDs(ctx *gin.Context, ids []uuid.UUID) ([]advantage.Advantage, error) {
	locale, ok := ctx.Get("locale")
	if !ok || locale == "" {
		r.logger.Error("Error retrieving value from context")
		return nil, errors.New("error retrieving value from context")
	}

	var advantages []advantage.Advantage
	err := r.DB.Model(&models.Advantage{}).Select(fmt.Sprintf("id, type, name_%s as name", locale)).Where("id IN (?)", ids).Find(&advantages).Error
	if err != nil {
		r.logger.Info("Error getting advantages", zap.Error(err))
		return nil, err
	}
	return advantages, nil
}
