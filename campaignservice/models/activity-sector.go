package models

type ActivitySector struct {
	Base
	Name       string      `gorm:"not null"`
	Advantages []Advantage `gorm:"many2many:activity_sector_advantage;"`
}
