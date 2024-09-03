package http

import (
	"github.com/gin-gonic/gin"
	"github.com/moyasvadba/campaignservice/advantage"
	"github.com/moyasvadba/campaignservice/internal/middleware"
)

func RegisterHTTPEndpoints(router *gin.Engine, uc advantage.UseCase) {
	h := NewHandler(uc)

	advantageEndpoints := router.Group("/advantages")
	{
		advantageEndpoints.GET("/:id", h.GetAdvantageByID)
		advantageEndpoints.GET("/type/:type", h.GetAdvantagesByType)
		advantageEndpoints.GET("/", h.GetAdvantages)
		advantageEndpoints.POST("/", middleware.PermissionAuth([]string{"manage_advantages"}), h.CreateAdvantage)
		advantageEndpoints.POST("/many", middleware.PermissionAuth([]string{"manage_advantages"}), h.CreateAdvantages)
		advantageEndpoints.PUT("/:id", middleware.PermissionAuth([]string{"manage_advantages"}), h.UpdateAdvantage)
		advantageEndpoints.DELETE("/:id", middleware.PermissionAuth([]string{"manage_advantages"}), h.DeleteAdvantage)
		advantageEndpoints.DELETE("/many", middleware.PermissionAuth([]string{"manage_advantages"}), h.DeleteAdvantages)
	}
}
