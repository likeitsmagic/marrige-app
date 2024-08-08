package gorm

import (
	"context"

	"github.com/moyasvadba/userservice/internal/logger"
	"github.com/moyasvadba/userservice/models"
	"go.uber.org/zap"
	"gorm.io/gorm"
)


type PermissionRepository struct {
	db     *gorm.DB
	logger *logger.Logger
}

func NewPermissionRepository(db *gorm.DB, logger *logger.Logger) *PermissionRepository {
	return &PermissionRepository{db: db, logger: logger}
}

func (pr *PermissionRepository) CreatePermission(ctx context.Context, permission *models.Permission) (*models.Permission, error) {
	err := pr.db.Create(permission).Error
	if err != nil {
		pr.logger.Error("Error creating permission", zap.Error(err))
		return nil, err
	}
	return permission, nil
}

func (pr *PermissionRepository) GetPermissionByName(ctx context.Context, name string) (*models.Permission, error) {
	var permission models.Permission
	err := pr.db.Where("name = ?", name).First(&permission).Error
	if err != nil {
		pr.logger.Error("Error getting permission by name", zap.Error(err))
		return nil, err
	}
	return &permission, nil
}