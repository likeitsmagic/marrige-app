package http

import (
	"github.com/gin-gonic/gin"
	"github.com/moyasvadba/campaignservice/campaign"
	"github.com/moyasvadba/campaignservice/internal/middleware"
)

func RegisterHTTPEndpoints(router *gin.RouterGroup, uc campaign.UseCase) {
	h := NewHandler(uc)

	{
		router.GET("/:id", h.GetCampaignByID)
		router.GET("/", h.GetCampaigns)
		router.POST("/", middleware.PermissionAuth([]string{"business"}), h.CreateCampaign)
	}
}
