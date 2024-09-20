package grpc

import (
	"context"

	"github.com/dewski/spatial"
	pb "github.com/moyasvadba/regionservice/proto"
	"github.com/moyasvadba/regionservice/region"
)

type Handler struct {
	pb.UnimplementedRegionServiceServer
	useCase region.Usecase
}

func NewHandler(useCase region.Usecase) *Handler {
	return &Handler{
		useCase: useCase,
	}
}

func (h *Handler) CreateRegion(ctx context.Context, req *pb.CreateRegionRequest) (*pb.CreateRegionResponse, error) {
	region, err := h.useCase.Create(ctx, &region.RegionInput{
		Location: spatial.Point{
			Lat: req.GetLocation()[1],
			Lng: req.GetLocation()[0],
		},
	})

	if err != nil {
		return nil, err
	}

	return &pb.CreateRegionResponse{
		Id:          region.ID.String(),
		Location:    []float64{region.Location.Lat, region.Location.Lng},
	}, nil
}
