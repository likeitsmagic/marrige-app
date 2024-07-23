package models

type Advantage struct {
	Base
	Type string `gorm:"not null" json:"type"`
	Name string `gorm:"not null;unique" json:"name"`
}
