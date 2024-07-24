package main

import (
	"github.com/moyasvadba/userservice/internal/config"
	"github.com/moyasvadba/userservice/internal/logger"
	"github.com/moyasvadba/userservice/server"
)

func main() {
	cfg := config.GetConfig()
	logger := logger.NewLogger(cfg)

	app := server.NewApp(cfg, logger)

	app.Run()
}
