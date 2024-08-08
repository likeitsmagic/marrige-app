package permission

import (
	"context"

	"github.com/moyasvadba/userservice/models"
)

type PermissionRepository interface {
	CreatePermission(ctx context.Context, permission *models.Permission) (*models.Permission, error)
	GetPermissionByName(ctx context.Context, name string) (*models.Permission, error)
}