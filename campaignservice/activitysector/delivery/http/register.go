package http

import (
	"github.com/gin-gonic/gin"
	"github.com/moyasvadba/campaignservice/activitysector"
	"github.com/moyasvadba/campaignservice/internal/middleware"
)

func RegisterHTTPEndpoints(router *gin.RouterGroup, uc activitysector.UseCase) {
	handler := NewHandler(uc)

	r := router.Group("/activitysectors")

	r.GET("/", handler.GetActivitySectors)
	r.GET("/:id", handler.GetActivitySector)
	r.POST("/", middleware.PermissionAuth([]string{"manage_activity_sectors"}), handler.CreateActivitySector)
	r.PUT("/:id", middleware.PermissionAuth([]string{"manage_activity_sectors"}), handler.UpdateActivitySector)
	r.DELETE("/:id", middleware.PermissionAuth([]string{"manage_activity_sectors"}), handler.DeleteActivitySector)
}
