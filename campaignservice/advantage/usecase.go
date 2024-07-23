package advantage

import (
	"context"

	"github.com/google/uuid"
	"github.com/moyasvadba/campaignservice/models"
)

type UseCase interface {
	Create(ctx context.Context, advantage *models.Advantage) (*models.Advantage, error)
	CreateMany(ctx context.Context, advantages []*models.Advantage) ([]*models.Advantage, error)
	GetAll(ctx context.Context) ([]*models.Advantage, error)
	GetByType(ctx context.Context, advantageType string) ([]*models.Advantage, error)
	GetByID(ctx context.Context, id uuid.UUID) (*models.Advantage, error)
	Update(ctx context.Context, advantage *models.Advantage) error
	Delete(ctx context.Context, id uuid.UUID) error
	DeleteMany(ctx context.Context, ids []uuid.UUID) error
}
