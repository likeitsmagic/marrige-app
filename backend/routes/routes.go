package routes

import (
	"marriage-service/internal/auth"
	"marriage-service/internal/config"
	"marriage-service/middleware"
	controller "marriage-service/users/controllers"
	service "marriage-service/users/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func UserRoutes(r *gin.RouterGroup, db *gorm.DB, config *config.Config) {
	userService := service.NewUserService(db)
	jwtService := auth.NewJWTService(config)
	userController := controller.NewUserController(userService, jwtService)

	r.POST("/users", userController.CreateUser)
	r.POST("/users/login", userController.LoginUser)
	r.POST("/users/refresh", userController.RefreshToken)

	r.GET("/users", middleware.JWTAuth(jwtService), userController.GetUsers)
	r.GET("/users/:id", middleware.JWTAuth(jwtService), userController.GetUserByID)
	r.PUT("/users/:id", middleware.JWTAuth(jwtService), userController.UpdateUser)
	r.DELETE("/users/:id", middleware.JWTAuth(jwtService), userController.DeleteUser)
}
