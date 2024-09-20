package main

import (
	"github.com/moyasvadba/regionservice/internal/config"
	"github.com/moyasvadba/regionservice/internal/logger"
	"github.com/moyasvadba/regionservice/server"
)

func main() {
	cfg := config.GetConfig()
	logger := logger.NewLogger(cfg)

	app := server.NewApp(cfg, logger)

	app.Run()
}
