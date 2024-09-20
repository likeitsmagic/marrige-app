package config

import (
	"log"

	"github.com/Netflix/go-env"
)

type Config struct {
	LogLevel string `env:"LOG_LEVEL"`

	PostgresUser     string `env:"POSTGRES_REGIONSERVICE_USER"`
	PostgresPassword string `env:"POSTGRES_REGIONSERVICE_PASSWORD"`
	PostgresDb       string `env:"POSTGRES_REGIONSERVICE_DB"`
	PostgresHost     string `env:"POSTGRES_REGIONSERVICE_HOST"`
	PostgresPort     string `env:"POSTGRES_REGIONSERVICE_PORT"`

	YandexGeocoderUrl string `env:"YANDEX_GEOCODER_URL"`
	YandexGeocoderApiKey string `env:"YANDEX_GEOCODER_API_KEY"`
}

func GetConfig() *Config {
	cfg := &Config{}

	_, err := env.UnmarshalFromEnviron(cfg)

	if err != nil {
		log.Panicln(err)
	}

	return cfg
}
