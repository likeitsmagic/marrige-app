package models

import "time"

type User struct {
	Base
	Email       string       `gorm:"unique;not null"`
	Password    string       `gorm:"not null"`
	IsConfirmed bool         `gorm:"default:false"`
	ConfirmedAt time.Time    `gorm:"type:timestamp;"`
	Permissions []Permission `gorm:"many2many:user_permissions;"`
	IsBanned    bool         `gorm:"default:false"`
	BanReason   string       `gorm:"type:text"`
	BannedAt    time.Time    `gorm:"type:timestamp"`
}
