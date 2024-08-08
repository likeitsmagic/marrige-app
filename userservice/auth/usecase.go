package auth

import (
	"context"

	"github.com/moyasvadba/userservice/models"
)

type AuthClaims struct {
	AccessToken  string
	RefreshToken string
}

type UseCase interface {
	SignUp(ctx context.Context, email, password string, business bool) (AuthClaims, error)
	SignIn(ctx context.Context, email, password string) (AuthClaims, error)
	UpdateTokens(ctx context.Context, accessToken string) (AuthClaims, error)
	PermissionAuth(ctx context.Context, accessToken string, permissions []string) (*models.User, error)
}
