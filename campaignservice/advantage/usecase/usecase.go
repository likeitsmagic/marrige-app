package usecase

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/moyasvadba/campaignservice/advantage"
	"github.com/moyasvadba/campaignservice/models"
	"gorm.io/gorm"
)

type AdvantageUseCase struct {
	advantageRepo advantage.Repository
}

func NewAdvantageUseCase(advantageRepo advantage.Repository) *AdvantageUseCase {
	return &AdvantageUseCase{
		advantageRepo: advantageRepo,
	}
}

func (u *AdvantageUseCase) Create(ctx *gin.Context, advantage *models.Advantage) (*models.Advantage, error) {
	createdAdvantage, err := u.advantageRepo.Create(ctx, advantage)
	if err != nil {
		return nil, err
	}
	return createdAdvantage, nil
}

func (u *AdvantageUseCase) CreateMany(ctx *gin.Context, advantages []*models.Advantage) ([]*models.Advantage, error) {
	createdAdvantages, err := u.advantageRepo.CreateMany(ctx, advantages)
	if err != nil {
		return nil, err
	}
	return createdAdvantages, nil
}

func (u *AdvantageUseCase) GetAll(ctx *gin.Context) ([]advantage.Advantage, error) {
	return u.advantageRepo.GetAll(ctx)
}

func (u *AdvantageUseCase) GetByType(ctx *gin.Context, t string) ([]advantage.Advantage, error) {
	advantages, err := u.advantageRepo.GetByType(ctx, t)
	if err != nil {
		return nil, advantage.ErrAdvantagesNotFound
	}
	return advantages, nil
}

func (u *AdvantageUseCase) GetByID(ctx *gin.Context, id uuid.UUID) (advantage.Advantage, error) {
	foundedAdvantage, err := u.advantageRepo.GetByID(ctx, id)
	if err != nil {
		return advantage.Advantage{}, advantage.ErrAdvantageNotFound
	}
	return foundedAdvantage, nil
}

func (u *AdvantageUseCase) Update(ctx *gin.Context, advantage *models.Advantage) error {
	return u.advantageRepo.Update(ctx, advantage)
}

func (u *AdvantageUseCase) Delete(ctx *gin.Context, id uuid.UUID) error {
	err := u.advantageRepo.Delete(ctx, id)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return advantage.ErrAdvantageNotFound
		}
	}
	return nil
}

func (u *AdvantageUseCase) DeleteMany(ctx *gin.Context, ids []uuid.UUID) error {
	return u.advantageRepo.DeleteMany(ctx, ids)
}
