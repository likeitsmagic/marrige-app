package gorm

import (
	"context"

	"github.com/moyasvadba/userservice/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type UserRepository struct {
	DB *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{
		DB: db,
	}
}

func (service *UserRepository) CreateUser(ctx context.Context, user *models.User) (*models.User, error) {
	err := service.DB.Create(user).Error
	return user, err
}

func (service *UserRepository) GetUserByID(ctx context.Context, id uuid.UUID) (*models.User, error) {
	var user models.User
	err := service.DB.First(&user, id).Error
	return &user, err
}

func (service *UserRepository) GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
	var user models.User
	err := service.DB.Where("email = ?", email).First(&user).Error
	return &user, err
}
