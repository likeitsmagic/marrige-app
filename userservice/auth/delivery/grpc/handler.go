package grpc

import (
	"context"

	"github.com/moyasvadba/userservice/auth"
	pb "github.com/moyasvadba/userservice/proto"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Handler struct {
	pb.UnimplementedAuthServiceServer
	useCase auth.UseCase
}

func NewHandler(useCase auth.UseCase) *Handler {
	return &Handler{
		useCase: useCase,
	}
}

func (h *Handler) PermissionAuth(ctx context.Context, req *pb.PermissionAuthRequest) (*pb.PermissionAuthResponse, error) {
	user, err := h.useCase.PermissionAuth(ctx, req.GetToken(), req.GetPermissions())
	if err != nil {
		if err == auth.ErrNoPermission {
			return &pb.PermissionAuthResponse{}, status.Error(codes.PermissionDenied, err.Error())
		}
		return &pb.PermissionAuthResponse{}, status.Error(codes.Unauthenticated, err.Error())
	}

	return &pb.PermissionAuthResponse{
		Id:          user.ID.String(),
		Email:       user.Email,
		Permissions: user.GetPermissions(),
		IsConfirmed: user.IsConfirmed,
	}, nil
}
