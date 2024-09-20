package region

import (
	"context"

	"github.com/google/uuid"
	"github.com/moyasvadba/regionservice/models"
)


type Repository interface {
	Create(ctx context.Context, region *models.Region) (*models.Region, error)
	GetByID(ctx context.Context, id uuid.UUID) (*models.Region, error)
}