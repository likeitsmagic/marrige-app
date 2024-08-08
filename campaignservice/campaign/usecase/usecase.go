package usecase

import (
	"context"

	"github.com/google/uuid"
	"github.com/moyasvadba/campaignservice/campaign"
	"github.com/moyasvadba/campaignservice/models"
)

type CampaignUseCase struct {
	campaignRepo campaign.Repository
}

func NewCampaignUseCase(campaignRepo campaign.Repository) *CampaignUseCase {
	return &CampaignUseCase{
		campaignRepo: campaignRepo,
	}
}

func (u *CampaignUseCase) Create(ctx context.Context, campaign campaign.CreateCampaignInput) (*models.Campaign, error) {
	createdCampaign, err := u.campaignRepo.Create(ctx, campaign)
	if err != nil {
		return nil, err
	}
	return createdCampaign, nil
}


func (u *CampaignUseCase) GetAll(ctx context.Context) ([]*models.Campaign, error) {
	return u.campaignRepo.GetAll(ctx)
}

func (u *CampaignUseCase) GetByID(ctx context.Context, id string) (*models.Campaign, error) {
	parsedID, err := uuid.Parse(id)
	if err != nil {
		return nil, err
	}
	foundedCampaign, err := u.campaignRepo.GetByID(ctx, parsedID)
	if err != nil {
		return nil, campaign.ErrCampaignNotFound
	}
	return foundedCampaign, nil
}
