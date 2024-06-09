package config

import "os"

type Config struct {
	DbHost string
	DbPort string
	DbUser string
	DbPass string
	DbName string
}

func (x Config) GetConfig() *Config {
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")
	dbName := os.Getenv("DB_NAME")

	return &Config{
		DbHost: dbHost,
		DbPort: dbPort,
		DbUser: dbUser,
		DbPass: dbPass,
		DbName: dbName,
	}
}
