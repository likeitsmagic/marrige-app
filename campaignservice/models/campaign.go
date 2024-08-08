package models

import "github.com/google/uuid"

type Campaign struct {
	Base
	OwnerID          uuid.UUID      `gorm:"not null unique" json:"owner_id"`
	Name             string         `gorm:"not null" json:"name"`
	Phone            string         `gorm:"not null" json:"phone"`
	Region           string         `gorm:"not null" json:"region"`
	IsReady          bool           `gorm:"not null;default:false" json:"is_ready"`
	Rating           float64        `gorm:"not null;default:0" json:"rating"`
	ActivitySectorID uuid.UUID      `gorm:"not null" json:"activity_sector_id"`
	ActivitySector   ActivitySector `gorm:"foreignKey:ActivitySectorID" json:"activity_sector"`
}
