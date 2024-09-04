package models

import (
	"time"

	"github.com/google/uuid"
)

type ActivitySector struct {
	ID        uuid.UUID  `gorm:"type:uuid;primary_key;default:gen_random_uuid();" json:"id"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `json:"deleted_at"`
	
	Name       string      `gorm:"not null;"`
	Advantages []Advantage `gorm:"many2many:activity_sector_advantage;" json:"advantages"`
}
