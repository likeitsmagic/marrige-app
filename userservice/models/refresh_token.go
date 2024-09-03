package models

import "github.com/google/uuid"


type RefreshToken struct {
	Base
	Token    string    `gorm:"not null"`
	UserId   uuid.UUID `gorm:"not null"`
	User     User      `gorm:"foreignKey:UserId"`
}
