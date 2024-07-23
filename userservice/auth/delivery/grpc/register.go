package grpc

import (
	"github.com/moyasvadba/userservice/auth"
	pb "github.com/moyasvadba/userservice/proto"
	"google.golang.org/grpc"
)

func RegisterGrpcServer(server *grpc.Server, uc auth.UseCase) {
	h := NewHandler(uc)

	pb.RegisterAuthServiceServer(server, h)
}
