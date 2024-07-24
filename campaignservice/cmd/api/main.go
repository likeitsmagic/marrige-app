package main

import (
	"github.com/moyasvadba/campaignservice/internal/config"
	"github.com/moyasvadba/campaignservice/internal/logger"
	"github.com/moyasvadba/campaignservice/server"
)

func main() {
	cfg := config.GetConfig()
	logger := logger.NewLogger(cfg)

	app := server.NewApp(cfg, logger)

	app.Run()
}
