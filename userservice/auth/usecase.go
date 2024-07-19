package auth

import (
	"context"
)

type AuthClaims struct {
	AccessToken  string
	RefreshToken string
}

type UseCase interface {
	SignUp(ctx context.Context, email, password string) (AuthClaims, error)
	SignIn(ctx context.Context, email, password string) (AuthClaims, error)
	UpdateTokens(ctx context.Context, accessToken string) (AuthClaims, error)
}
