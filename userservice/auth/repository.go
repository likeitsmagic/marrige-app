package auth

import (
	"context"

	"github.com/moyasvadba/userservice/models"

	"github.com/google/uuid"
)

type UserRepository interface {
	CreateUser(ctx context.Context, user *models.User) (*models.User, error)
	GetUserByEmail(ctx context.Context, email string) (*models.User, error)
	GetUserByID(ctx context.Context, id uuid.UUID) (*models.User, error)
	SaveRefreshToken(ctx context.Context, token string, userId uuid.UUID) error
	GetUserIdByRefreshToken(ctx context.Context, token string) (uuid.UUID, error)
}
