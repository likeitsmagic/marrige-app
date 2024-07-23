package repository

import (
	"context"

	"github.com/google/uuid"
	"github.com/moyasvadba/campaignservice/models"
	"gorm.io/gorm"
)

type AdvantageRepository struct {
	DB *gorm.DB
}

func NewAdvantageRepository(db *gorm.DB) *AdvantageRepository {
	return &AdvantageRepository{DB: db}
}

func (r *AdvantageRepository) Create(ctx context.Context, advantage *models.Advantage) (*models.Advantage, error) {
	err := r.DB.Create(&advantage).Error
	if err != nil {
		return nil, err
	}
	return advantage, nil
}

func (r *AdvantageRepository) CreateMany(ctx context.Context, advantages []*models.Advantage) ([]*models.Advantage, error) {
	err := r.DB.Create(&advantages).Error
	if err != nil {
		return nil, err
	}
	return advantages, nil
}

func (r *AdvantageRepository) GetAll(ctx context.Context) ([]*models.Advantage, error) {
	var advantages []*models.Advantage
	err := r.DB.Find(&advantages).Error
	if err != nil {
		return nil, err
	}
	return advantages, nil
}

func (r *AdvantageRepository) GetByID(ctx context.Context, id uuid.UUID) (*models.Advantage, error) {
	var advantage models.Advantage
	err := r.DB.First(&advantage, id).Error
	if err != nil {
		return nil, err
	}
	return &advantage, nil
}

func (r *AdvantageRepository) GetByType(ctx context.Context, t string) ([]*models.Advantage, error) {
	var advantages []*models.Advantage
	err := r.DB.Where("type = ?", t).Find(&advantages).Error
	if err != nil {
		return nil, err
	}
	return advantages, nil
}

func (r *AdvantageRepository) Update(ctx context.Context, advantage *models.Advantage) error {
	return r.DB.Save(&advantage).Error
}

func (r *AdvantageRepository) Delete(ctx context.Context, id uuid.UUID) error {
	return r.DB.Delete(&models.Advantage{}, id).Error
}

func (r *AdvantageRepository) DeleteMany(ctx context.Context, ids []uuid.UUID) error {
	return r.DB.Delete(&models.Advantage{}, ids).Error
}
