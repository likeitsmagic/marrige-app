package usecase

import (
	"context"
	"errors"
	"log"

	"github.com/moyasvadba/userservice/auth"
	"github.com/moyasvadba/userservice/internal/token"
	"github.com/moyasvadba/userservice/models"
	"gorm.io/gorm"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

type AuthUseCase struct {
	userRepo   auth.UserRepository
	jwtService token.JWTService
}

func NewAuthUseCase(
	userRepo auth.UserRepository,
	jwtService token.JWTService,
) *AuthUseCase {
	return &AuthUseCase{
		userRepo:   userRepo,
		jwtService: jwtService,
	}
}

func (a *AuthUseCase) SignUp(ctx context.Context, email, password string) (auth.AuthClaims, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return auth.AuthClaims{}, err
	}

	user := &models.User{
		Email:    email,
		Password: string(hashedPassword),
	}

	createdUser, err := a.userRepo.CreateUser(ctx, user)
	log.Println(err, gorm.ErrDuplicatedKey)
	if err != nil {
		if errors.Is(err, gorm.ErrDuplicatedKey) {
			return auth.AuthClaims{}, auth.ErrUserAlreadyExists
		}

		return auth.AuthClaims{}, err
	}

	accessToken, err := a.jwtService.GenerateAccessToken(createdUser.ID.String())
	if err != nil {
		return auth.AuthClaims{}, err
	}

	refreshToken, err := a.jwtService.GenerateRefreshToken(createdUser.ID.String())
	if err != nil {
		return auth.AuthClaims{}, err
	}

	return auth.AuthClaims{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func (a *AuthUseCase) SignIn(ctx context.Context, email, password string) (auth.AuthClaims, error) {
	user, err := a.userRepo.GetUserByEmail(ctx, email)
	if err != nil {
		return auth.AuthClaims{}, auth.ErrInvalidCredentials
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return auth.AuthClaims{}, auth.ErrInvalidCredentials
	}

	log.Println(user)

	accessToken, err := a.jwtService.GenerateAccessToken(user.ID.String())
	if err != nil {
		return auth.AuthClaims{}, err
	}
	refreshToken, err := a.jwtService.GenerateRefreshToken(user.ID.String())
	if err != nil {
		return auth.AuthClaims{}, err
	}

	return auth.AuthClaims{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func (a *AuthUseCase) UpdateTokens(ctx context.Context, refreshToken string) (auth.AuthClaims, error) {

	token, err := a.jwtService.ValidateToken(refreshToken, true)
	if err != nil || !token.Valid {
		return auth.AuthClaims{}, auth.ErrInvalidCredentials
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return auth.AuthClaims{}, auth.ErrInvalidCredentials
	}

	userID := claims["user_id"].(string)
	accessToken, err := a.jwtService.GenerateAccessToken(userID)
	if err != nil {
		return auth.AuthClaims{}, auth.ErrInvalidCredentials
	}

	refreshToken, err = a.jwtService.GenerateRefreshToken(userID)
	if err != nil {
		return auth.AuthClaims{}, auth.ErrInvalidCredentials
	}

	return auth.AuthClaims{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}
