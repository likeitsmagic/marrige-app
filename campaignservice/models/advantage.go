package models

import (
	"time"

	"github.com/google/uuid"
)

type Advantage struct {
	ID        uuid.UUID  `gorm:"type:uuid;primary_key;default:gen_random_uuid();" json:"id"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `json:"deleted_at"`
	
	Type string `gorm:"not null"`
	NameRU string `gorm:"not null;"`
	NameEN string `gorm:"not null;"`
	NameFR string `gorm:"not null;"`
}
