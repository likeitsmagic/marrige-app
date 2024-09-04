package usecase

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	activirysector "github.com/moyasvadba/campaignservice/activitysector"
	"github.com/moyasvadba/campaignservice/advantage"
	"github.com/moyasvadba/campaignservice/internal/logger"
	"github.com/moyasvadba/campaignservice/models"
	"go.uber.org/zap"
)

type ActivitySectorUsecase struct {
	activitySectorRepo activirysector.Repository
	advantageRepo      advantage.Repository
	logger             *logger.Logger
}

func NewActivitySectorUsecase(activitySectorRepo activirysector.Repository, advantageRepo advantage.Repository, logger *logger.Logger) *ActivitySectorUsecase {
	return &ActivitySectorUsecase{
		activitySectorRepo: activitySectorRepo,
		advantageRepo:      advantageRepo,
		logger:             logger,
	}
}

func (u *ActivitySectorUsecase) CreateActivitySector(ctx *gin.Context, name string, advantages []string) (*models.ActivitySector, error) {
	var advantageUUIDs []uuid.UUID
	for _, advantage := range advantages {
		advantageUUID, err := uuid.Parse(advantage)
		if err != nil {
			return nil, err
		}
		advantageUUIDs = append(advantageUUIDs, advantageUUID)
	}
	foundedAdvantages, err := u.advantageRepo.GetByIDs(ctx, advantageUUIDs)
	if err != nil {
		u.logger.Error("Error getting advantages", zap.Error(err))
		return nil, err
	}
	activitySector := &models.ActivitySector{
		Name: name,
	}
	return u.activitySectorRepo.CreateActivitySector(ctx, activitySector, foundedAdvantages)
}

func (u *ActivitySectorUsecase) GetActivitySector(ctx *gin.Context, id string) (activirysector.ActivitySector, error) {
	activitySectorID, err := uuid.Parse(id)
	if err != nil {
		return activirysector.ActivitySector{}, err
	}
	activitySector, err := u.activitySectorRepo.GetActivitySector(ctx, activitySectorID)
	if err != nil {
		u.logger.Error("Error getting activity sector", zap.Error(err))
		return activirysector.ActivitySector{}, err
	}
	return activitySector, nil
}

func (u *ActivitySectorUsecase) GetActivitySectors(ctx *gin.Context) ([]activirysector.ActivitySector, error) {
	activitySectors, err := u.activitySectorRepo.GetActivitySectors(ctx)
	if err != nil {
		u.logger.Error("Error getting activity sectors", zap.Error(err))
		return nil, err
	}
	return activitySectors, nil
}

func (u *ActivitySectorUsecase) UpdateActivitySector(ctx *gin.Context, id string, name string, advantages []string) (*models.ActivitySector, error) {
	var advantageUUIDs []uuid.UUID
	for _, advantage := range advantages {
		advantageUUID, err := uuid.Parse(advantage)
		if err != nil {
			return nil, err
		}
		advantageUUIDs = append(advantageUUIDs, advantageUUID)
	}
	foundedAdvantages, err := u.advantageRepo.GetByIDs(ctx, advantageUUIDs)
	if err != nil {
		u.logger.Error("Error getting advantages", zap.Error(err))
		return nil, err
	}
	activitySectorID, err := uuid.Parse(id)
	if err != nil {
		return nil, err
	}
	activitySector, err := u.activitySectorRepo.GetActivitySector(ctx, activitySectorID)
	if err != nil {
		u.logger.Error("Error getting activity sector", zap.Error(err))
		return nil, err
	}

	activitySector.Name = name
	updatedActivitySector, err := u.activitySectorRepo.UpdateActivitySector(ctx, activitySector, foundedAdvantages)

	if err != nil {
		u.logger.Error("Error updating activity sector")
		return nil, err
	}

	return updatedActivitySector, nil
}

func (u *ActivitySectorUsecase) DeleteActivitySector(ctx *gin.Context, id string) error {
	activitySectorID, err := uuid.Parse(id)
	if err != nil {
		return err
	}
	err = u.activitySectorRepo.DeleteActivitySector(ctx, activitySectorID)
	if err != nil {
		u.logger.Error("Error deliting activity sector")
		return err
	}

	return nil
}
