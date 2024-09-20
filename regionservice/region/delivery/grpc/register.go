package grpc

import (
	pb "github.com/moyasvadba/regionservice/proto"
	"github.com/moyasvadba/regionservice/region"
	"google.golang.org/grpc"
)

func RegisterGrpcServer(server *grpc.Server, uc region.Usecase) {
	h := NewHandler(uc)

	pb.RegisterRegionServiceServer(server, h)
}
