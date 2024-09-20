package models

import (
	"github.com/dewski/spatial"
)

type Point struct {
	X, Y float64
}

type Region struct {
	Base
	Location spatial.Point `gorm:"type:geometry(Point,4326)"`
}