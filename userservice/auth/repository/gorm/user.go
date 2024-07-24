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
	DB     *gorm.DB
	Logger *logger.Logger
}

func NewUserRepository(db *gorm.DB, logger *logger.Logger) *UserRepository {
	return &UserRepository{
		DB:     db,
		Logger: logger,
	}
}

func (r *UserRepository) CreateUser(ctx context.Context, user *models.User) (*models.User, error) {
	err := r.DB.Create(user).Error
	r.Logger.Info("Error creating user", zap.Error(err))
	return user, err
}

func (r *UserRepository) GetUserByID(ctx context.Context, id uuid.UUID) (*models.User, error) {
	var user models.User
	err := r.DB.Preload("Permissions").First(&user, id).Error
	r.Logger.Info("Error getting user by id", zap.Error(err))
	return &user, err
}

func (r *UserRepository) GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
	var user models.User
	err := r.DB.Where("email = ?", email).First(&user).Error
	r.Logger.Info("Error getting user by email", zap.Error(err))
	return &user, err
}
