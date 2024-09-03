package config

import (
	"log"

	"github.com/Netflix/go-env"
)

type Config struct {
	LogLevel string `env:"LOG_LEVEL"`

	PostgresUser     string `env:"POSTGRES_USERSERVICE_USER"`
	PostgresPassword string `env:"POSTGRES_USERSERVICE_PASSWORD"`
	PostgresDb       string `env:"POSTGRES_USERSERVICE_DB"`
	PostgresHost     string `env:"POSTGRES_USERSERVICE_HOST"`
	PostgresPort     string `env:"POSTGRES_USERSERVICE_PORT"`

	AccessSecret  string `env:"ACCESS_SECRET"`
	RefreshSecret string `env:"REFRESH_SECRET"`
	Domain        string `env:"DOMAIN"`
}

func GetConfig() *Config {
	cfg := &Config{}

	_, err := env.UnmarshalFromEnviron(cfg)

	if err != nil {
		log.Panicln(err)
	}

	return cfg
}
