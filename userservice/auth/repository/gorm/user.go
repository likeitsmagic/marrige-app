package gorm

import (
	"context"

	"github.com/moyasvadba/userservice/internal/logger"
	"github.com/moyasvadba/userservice/models"
	"go.uber.org/zap"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type UserRepository struct {
	db     *gorm.DB
	logger *logger.Logger
}

func NewUserRepository(db *gorm.DB, logger *logger.Logger) *UserRepository {
	return &UserRepository{
		db:     db,
		logger: logger,
	}
}

func (r *UserRepository) CreateUser(ctx context.Context, user *models.User) (*models.User, error) {
	err := r.db.Preload("Permissions").Create(user).Error
	if err != nil {
		r.logger.Info("Error creating user", zap.Error(err))
		return nil, err
	}
	return user, nil
}

func (r *UserRepository) GetUserByID(ctx context.Context, id uuid.UUID) (*models.User, error) {
	var user models.User
	err := r.db.Preload("Permissions").First(&user, id).Error
	if err != nil {
		r.logger.Info("Error getting user by id", zap.Error(err))
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
	var user models.User
	err := r.db.Preload("Permissions").Where("email = ?", email).First(&user).Error
	if err != nil {
		r.logger.Info("Error getting user by email", zap.Error(err))
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) SaveRefreshToken(ctx context.Context, token string, userID uuid.UUID) error {
	refreshToken := models.RefreshToken{
		Token:  token,
		UserId: userID,
	}
	err := r.db.Create(&refreshToken).Error
	if err != nil {
		r.logger.Info("Error saving refresh token", zap.Error(err))
		return err
	}
	return nil
}

func (r *UserRepository) GetUserIdByRefreshToken(ctx context.Context, token string) (uuid.UUID, error) {
	var refreshToken models.RefreshToken
	err := r.db.Where("token = ?", token).Order("created_at desc").First(&refreshToken).Error
	if err != nil {
		r.logger.Info("Error getting user info by refresh token", zap.Error(err))
		return uuid.Nil, err
	}
	return refreshToken.UserId, nil
}