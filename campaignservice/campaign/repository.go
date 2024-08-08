package campaign

import (
	"context"

	"github.com/google/uuid"
	"github.com/moyasvadba/campaignservice/models"
)

type Repository interface {
	Create(ctx context.Context, campaign CreateCampaignInput) (*models.Campaign, error)
	GetAll(ctx context.Context) ([]*models.Campaign, error)
	GetByID(ctx context.Context, id uuid.UUID) (*models.Campaign, error)
}
