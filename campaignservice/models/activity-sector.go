package models

type ActivitySector struct {
	Base
	Name       string      `gorm:"not null;unique" json:"name"`
	Advantages []Advantage `gorm:"many2many:activity_sector_advantage;" json:"advantages"`
}
