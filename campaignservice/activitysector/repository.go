package activitysector

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/moyasvadba/campaignservice/advantage"
	"github.com/moyasvadba/campaignservice/models"
)

type ActivitySector struct {
	ID        uuid.UUID  `json:"id"`
	Name      string     `json:"name"`
	Advantages []advantage.Advantage `json:"advantages"`
}

type Repository interface {
	GetActivitySector(ctx *gin.Context, id uuid.UUID) (ActivitySector, error)
	GetActivitySectors(ctx *gin.Context) ([]ActivitySector, error)
	CreateActivitySector(ctx *gin.Context, activitySector *models.ActivitySector, advantages []advantage.Advantage) (*models.ActivitySector, error)
	UpdateActivitySector(ctx *gin.Context, activitySector ActivitySector, advantages []advantage.Advantage) (*models.ActivitySector, error)
	DeleteActivitySector(ctx *gin.Context, id uuid.UUID) error
}
