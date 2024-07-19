package main

import (
	"github.com/moyasvadba/userservice/internal/config"
	"github.com/moyasvadba/userservice/server"
)

func main() {
	cfg := config.GetConfig()

	app := server.NewApp(cfg)

	app.Run()
}
