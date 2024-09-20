package region

import (
	"context"

	"github.com/dewski/spatial"
	"github.com/moyasvadba/regionservice/models"
)
type RegionInput struct {
	Name     string
	Location spatial.Point
}

type Usecase interface {
	Create(ctx context.Context, region *RegionInput) (*models.Region, error)
	GetByID(ctx context.Context, id string) (*models.Region, error)
}