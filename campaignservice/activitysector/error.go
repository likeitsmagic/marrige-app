package activitysector

import "errors"

var (
	ErrActivitySectorNotFound      = errors.New("activity sector not found")
	ErrActivitySectorAlreadyExists = errors.New("activity sector already exists")
)
