package usecase

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/moyasvadba/userservice/auth"
	"github.com/moyasvadba/userservice/internal/logger"
	"github.com/moyasvadba/userservice/internal/token"
	"github.com/moyasvadba/userservice/models"
	"github.com/moyasvadba/userservice/permission"
	"go.uber.org/zap"
	"gorm.io/gorm"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

type AuthUseCase struct {
	userRepo   auth.UserRepository
	permissionRepo permission.PermissionRepository
	jwtService *token.JWTService
	logger     *logger.Logger
}

func NewAuthUseCase(
	userRepo auth.UserRepository,
	permissionRepo permission.PermissionRepository,
	jwtService *token.JWTService,
	logger *logger.Logger,
) *AuthUseCase {
	return &AuthUseCase{
		userRepo:      userRepo,
		permissionRepo: permissionRepo,
		jwtService:     jwtService,
		logger:        logger,
	}
}

func (a *AuthUseCase) SignUp(ctx context.Context, email, password string, business bool) (auth.AuthClaims, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return auth.AuthClaims{}, err
	}

	user := &models.User{
		Email:    email,
		Password: string(hashedPassword),
		
	}

	if business {
		permission, err := a.permissionRepo.GetPermissionByName(ctx, "business")
		if err != nil {
			return auth.AuthClaims{}, err
		}
		user.Permissions = []models.Permission{*permission}
	}

	createdUser, err := a.userRepo.CreateUser(ctx, user)
	if err != nil {
		if errors.Is(err, gorm.ErrDuplicatedKey) {
			return auth.AuthClaims{}, auth.ErrUserAlreadyExists
		}

		return auth.AuthClaims{}, err
	}

	accessToken, err := a.jwtService.GenerateAccessToken(createdUser.ID.String(), createdUser.GetPermissions())
	if err != nil {
		a.logger.Error("Error generating access token", zap.Error(err))
		return auth.AuthClaims{}, err
	}

	refreshToken, err := a.jwtService.GenerateRefreshToken(createdUser.ID.String())
	if err != nil {
		a.logger.Error("Error generating refresh token", zap.Error(err))
		return auth.AuthClaims{}, err
	}

	err = a.userRepo.SaveRefreshToken(ctx, refreshToken, createdUser.ID)
	if err != nil {
		a.logger.Error("Error saving refresh token", zap.Error(err))
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

	accessToken, err := a.jwtService.GenerateAccessToken(user.ID.String(), user.GetPermissions())
	if err != nil {
		a.logger.Error("Error generating access token", zap.Error(err))
		return auth.AuthClaims{}, err
	}
	refreshToken, err := a.jwtService.GenerateRefreshToken(user.ID.String())
	if err != nil {
		a.logger.Error("Error generating refresh token", zap.Error(err))
		return auth.AuthClaims{}, err
	}

	err = a.userRepo.SaveRefreshToken(ctx, refreshToken, user.ID)
	if err != nil {
		a.logger.Error("Error saving refresh token", zap.Error(err))
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
		a.logger.Error("Error validating refresh token", zap.Error(err))
		return auth.AuthClaims{}, auth.ErrInvalidCredentials
	}

	userID, err := a.userRepo.GetUserIdByRefreshToken(ctx, refreshToken)
	if err != nil {
		a.logger.Error("Error getting user ID by refresh token", zap.Error(err))
		return auth.AuthClaims{}, auth.ErrInvalidCredentials
	}

	user, err := a.userRepo.GetUserByID(ctx, userID)
	if err != nil {
		a.logger.Error("Error getting user by ID", zap.Error(err))
		return auth.AuthClaims{}, auth.ErrInvalidCredentials
	}

	accessToken, err := a.jwtService.GenerateAccessToken(userID.String(), user.GetPermissions())
	if err != nil {
		a.logger.Error("Error generating access token", zap.Error(err))
		return auth.AuthClaims{}, auth.ErrInvalidCredentials
	}

	refreshToken, err = a.jwtService.GenerateRefreshToken(userID.String())
	if err != nil {
		a.logger.Error("Error generating refresh token", zap.Error(err))
		return auth.AuthClaims{}, auth.ErrInvalidCredentials
	}

	err = a.userRepo.SaveRefreshToken(ctx, refreshToken, userID)
	if err != nil {
		a.logger.Error("Error saving refresh token", zap.Error(err))
		return auth.AuthClaims{}, err
	}

	return auth.AuthClaims{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func (a *AuthUseCase) PermissionAuth(ctx context.Context, accessToken string, permissions []string) (*models.User, error) {
	token, err := a.jwtService.ValidateToken(accessToken, false)
	if err != nil {
		a.logger.Error("Error validating access token", zap.Error(err))
		return nil, auth.ErrInvalidCredentials
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		a.logger.Error("Error validating access token", zap.Error(err))
		return nil, auth.ErrInvalidCredentials
	}

	userID, err := uuid.Parse(claims["sub"].(string))
	if err != nil {
		a.logger.Error("Error parsing user ID", zap.Error(err))
		return nil, auth.ErrInvalidCredentials
	}

	user, err := a.userRepo.GetUserByID(ctx, userID)
	if err != nil {
		a.logger.Error("Error getting user by ID", zap.Error(err))
		return nil, auth.ErrInvalidCredentials
	}

	userPermissions := user.GetPermissions()
	permissionSet := make(map[string]struct{}, len(userPermissions))
	for _, userPermission := range userPermissions {
		permissionSet[userPermission] = struct{}{}
	}

	for _, requiredPermission := range permissions {
		if _, ok := permissionSet[requiredPermission]; !ok {
			return nil, auth.ErrNoPermission
		}
	}

	return user, nil
}

func (a *AuthUseCase) Me(ctx context.Context, userID string) (*models.User, error) {
	parsedUserID, err := uuid.Parse(userID)
	if err != nil {
		a.logger.Error("Error parsing user ID", zap.Error(err))
		return nil, auth.ErrInvalidCredentials
	}

	user, err := a.userRepo.GetUserByID(ctx, parsedUserID)
	if err != nil {
		a.logger.Error("Error getting user by ID", zap.Error(err))
		return nil, auth.ErrInvalidCredentials
	}

	return user, nil
}
