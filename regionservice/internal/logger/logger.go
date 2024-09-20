package logger

import (
	"log"

	"github.com/moyasvadba/regionservice/internal/config"
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

func (l *Logger) Debug(msg string, fields ...zap.Field) {
	l.Logger.Debug(msg, fields...)
}

func (l *Logger) Info(msg string, fields ...zap.Field) {
	l.Logger.Info(msg, fields...)
}

func (l *Logger) Warn(msg string, fields ...zap.Field) {
	l.Logger.Warn(msg, fields...)
}

func (l *Logger) Error(msg string, fields ...zap.Field) {
	l.Logger.Error(msg, fields...)
}

func (l *Logger) Fatal(msg string, fields ...zap.Field) {
	l.Logger.Fatal(msg, fields...)
}

func (l *Logger) Panic(msg string, fields ...zap.Field) {
	l.Logger.Panic(msg, fields...)
}
