package model

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Password string `gorm:"not null"`
	Email    string `gorm:"unique;not null"`
}
