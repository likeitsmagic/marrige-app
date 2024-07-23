package models

import "github.com/google/uuid"

type Campaign struct {
	Base
	Name             string         `gorm:"not null"`
	Region           string         `gorm:"not null"`
	Phone            string         `gorm:"not null"`
	IsReady          bool           `gorm:"not null;default:false"`
	Rating           float64        `gorm:"not null;default:0"`
	ActivitySectorID uuid.UUID      `gorm:"not null"`
	ActivitySector   ActivitySector `gorm:"foreignKey:ActivitySectorID"`
}
