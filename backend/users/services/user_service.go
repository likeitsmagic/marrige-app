package service

import (
	model "marriage-service/users/models"

	"gorm.io/gorm"
)

type UserService struct {
	DB *gorm.DB
}

func NewUserService(db *gorm.DB) *UserService {
	return &UserService{
		DB: db,
	}
}

func (service *UserService) CreateUser(user *model.User) error {
	return service.DB.Create(user).Error
}

func (service *UserService) GetUserByID(id uint) (*model.User, error) {
	var user model.User
	err := service.DB.First(&user, id).Error
	return &user, err
}

func (service *UserService) GetUserByEmail(email string) (*model.User, error) {
	var user model.User
	err := service.DB.Where("email = ?", email).First(&user).Error
	return &user, err
}

func (service *UserService) GetUsers() ([]model.User, error) {
	var users []model.User
	err := service.DB.Find(&users).Error
	return users, err
}

func (service *UserService) UpdateUser(user *model.User) error {
	return service.DB.Save(user).Error
}

func (service *UserService) DeleteUser(id uint) error {
	return service.DB.Delete(&model.User{}, id).Error
}
