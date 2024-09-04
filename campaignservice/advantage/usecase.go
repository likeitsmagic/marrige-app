package advantage

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/moyasvadba/campaignservice/models"
)

type UseCase interface {
	Create(ctx *gin.Context, advantage *models.Advantage) (*models.Advantage, error)
	CreateMany(ctx *gin.Context, advantages []*models.Advantage) ([]*models.Advantage, error)
	GetAll(ctx *gin.Context) ([]Advantage, error)
	GetByType(ctx *gin.Context, advantageType string) ([]Advantage, error)
	GetByID(ctx *gin.Context, id uuid.UUID) (Advantage, error)
	Update(ctx *gin.Context, advantage *models.Advantage) error
	Delete(ctx *gin.Context, id uuid.UUID) error
	DeleteMany(ctx *gin.Context, ids []uuid.UUID) error
}
