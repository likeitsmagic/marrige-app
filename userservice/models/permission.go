package models

type Permission struct {
	Base
	Name string `gorm:"not null; unique"`
}
