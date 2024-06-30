package main

import (
	"fmt"
	"log"
	"marriage-service/internal/config"
	"marriage-service/internal/repository"
	"marriage-service/routes"
	model "marriage-service/users/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	c := config.GetConfig()

	cors_config := cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "https://mayna-system.ru"},
		AllowCredentials: true,
		AllowHeaders:     []string{"Content-Type", "Authorization"},
	}
	r.Use(cors.New(cors_config))

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai", c.PostgresHost,
		c.PostgresUser, c.PostgresPassword, c.PostgresDb, c.PostgresPort)
	log.Println(dsn)
	db := repository.NewRepository(dsn)

	err := db.DB.AutoMigrate(&model.User{})
	if err != nil {
		log.Fatal("Failed to migrate database!")
	}

	api := r.Group("/api")

	routes.UserRoutes(api, db.DB, c)

	r.Run()
}
