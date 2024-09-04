package activitysector

import (
	"github.com/gin-gonic/gin"
	"github.com/moyasvadba/campaignservice/models"
)

type UseCase interface {
	GetActivitySector(ctx *gin.Context, id string) (ActivitySector, error)
	GetActivitySectors(ctx *gin.Context) ([]ActivitySector, error)
	CreateActivitySector(ctx *gin.Context, name string, advantages []string) (*models.ActivitySector, error)
	UpdateActivitySector(ctx *gin.Context, id string, name string, advantages []string) (*models.ActivitySector, error)
	DeleteActivitySector(ctx *gin.Context, id string) error
}
