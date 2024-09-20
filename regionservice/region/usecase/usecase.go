package usecase

import (
	"context"

	"github.com/google/uuid"
	"github.com/moyasvadba/regionservice/internal/logger"
	"github.com/moyasvadba/regionservice/models"
	"github.com/moyasvadba/regionservice/region"
)

type RegionUsecase struct {
	regionRepo region.Repository
	logger *logger.Logger
}

func NewRegionUsecase(regionRepo region.Repository, logger *logger.Logger) *RegionUsecase {
	return &RegionUsecase{regionRepo: regionRepo, logger: logger}
}

func (u *RegionUsecase) Create(ctx context.Context, regionInput *region.RegionInput) (*models.Region, error) {
	region := &models.Region{
		Location: regionInput.Location,
	}

	region, err := u.regionRepo.Create(ctx, region)
	if err != nil {
		return nil, err
	}

	return region, nil
}

func (u *RegionUsecase) GetByID(ctx context.Context, id string) (*models.Region, error) {
	regionId, err := uuid.Parse(id)
	if err != nil {
		return nil, err
	}

	region, err := u.regionRepo.GetByID(ctx, regionId)
	if err != nil {
		return nil, err
	}

	return region, nil
}