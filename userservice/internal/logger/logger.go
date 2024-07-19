package logger

import (
	"log"

	"github.com/moyasvadba/userservice/internal/config"
	"go.uber.org/zap"
)

type Logger struct {
	Logger *zap.Logger
}

func NewLogger(cfg *config.Config) *Logger {
	var logger *zap.Logger

	if cfg.LogLevel == "debug" {
		logger = zap.NewExample()
		return &Logger{Logger: logger}
	}

	logger, err := zap.NewProduction()
	if err != nil {
		log.Fatalf("failed to create logger: %v", err)
	}

	return &Logger{Logger: logger}
}
