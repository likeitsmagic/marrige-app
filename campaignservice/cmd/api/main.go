package main

import (
	"github.com/moyasvadba/campaignservice/internal/config"
	"github.com/moyasvadba/campaignservice/server"
)

func main() {
	cfg := config.GetConfig()

	app := server.NewApp(cfg)

	app.Run()
}
