package config

import (
	"log"

	"github.com/Netflix/go-env"
)

type Config struct {
	LogLevel string `env:"LOG_LEVEL"`

	PostgresUser     string `env:"POSTGRES_CAMPAIGNSERVICE_USER"`
	PostgresPassword string `env:"POSTGRES_CAMPAIGNSERVICE_PASSWORD"`
	PostgresDb       string `env:"POSTGRES_CAMPAIGNSERVICE_DB"`
	PostgresHost     string `env:"POSTGRES_CAMPAIGNSERVICE_HOST"`
	PostgresPort     string `env:"POSTGRES_CAMPAIGNSERVICE_PORT"`

	AccessSecret  string `env:"ACCESS_SECRET"`
	RefreshSecret string `env:"REFRESH_SECRET"`
}

func GetConfig() *Config {
	cfg := &Config{}

	_, err := env.UnmarshalFromEnviron(cfg)

	if err != nil {
		log.Panicln(err)
	}

	return cfg
}
