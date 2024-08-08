package campaign

import (
	"context"

	"github.com/moyasvadba/campaignservice/models"
)

type CreateCampaignInput struct {
	OwnerID string
	Name string 
	Phone string
	Region string
	ActivitySectorID string
}

type UseCase interface {
	Create(ctx context.Context, campaign CreateCampaignInput) (*models.Campaign, error)
	GetAll(ctx context.Context) ([]*models.Campaign, error)
	GetByID(ctx context.Context, id string) (*models.Campaign, error)
}
