package activitysector

import (
	"context"

	"github.com/google/uuid"
	"github.com/moyasvadba/campaignservice/models"
)

type Repository interface {
	GetActivitySector(ctx context.Context, id uuid.UUID) (*models.ActivitySector, error)
	GetActivitySectors(ctx context.Context) ([]*models.ActivitySector, error)
	CreateActivitySector(ctx context.Context, activitySector *models.ActivitySector, advantages []*models.Advantage) (*models.ActivitySector, error)
	UpdateActivitySector(ctx context.Context, activitySector *models.ActivitySector, advantages []*models.Advantage) (*models.ActivitySector, error)
	DeleteActivitySector(ctx context.Context, id uuid.UUID) error
}
