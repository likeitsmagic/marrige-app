package activitysector

import (
	"context"

	"github.com/moyasvadba/campaignservice/models"
)

type UseCase interface {
	GetActivitySector(ctx context.Context, id string) (*models.ActivitySector, error)
	GetActivitySectors(ctx context.Context) ([]*models.ActivitySector, error)
	CreateActivitySector(ctx context.Context, name string, advantages []string) (*models.ActivitySector, error)
	UpdateActivitySector(ctx context.Context, id string, name string, advantages []string) (*models.ActivitySector, error)
	DeleteActivitySector(ctx context.Context, id string) error
}
