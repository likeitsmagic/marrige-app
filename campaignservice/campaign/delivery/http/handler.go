package http

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/moyasvadba/campaignservice/campaign"
)

type Handler struct {
	useCase campaign.UseCase
}

func NewHandler(useCase campaign.UseCase) *Handler {
	return &Handler{useCase: useCase}
}

type campaignInput struct {
	Name string `json:"name"`
	Phone string `json:"phone"`
	Region string `json:"region"`
	ActivitySectorID string `json:"activity_sector_id"`
}

func (h *Handler) CreateCampaign(c *gin.Context) {
	inp := new(campaignInput)

	if err := c.BindJSON(inp); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	id := c.MustGet("id").(string)

	campaign, err := h.useCase.Create(c.Request.Context(), campaign.CreateCampaignInput{
		Name: inp.Name,
		Phone: inp.Phone,
		Region: inp.Region,
		ActivitySectorID: inp.ActivitySectorID,
		OwnerID: id,
	})

	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusCreated, campaign)
}

func (h *Handler) GetCampaigns(c *gin.Context) {
	campaigns, err := h.useCase.GetAll(c.Request.Context())
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, campaigns)
}

func (h *Handler) GetCampaignByID(c *gin.Context) {
	id := c.Param("id")

	campaign, err := h.useCase.GetByID(c.Request.Context(), id)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, campaign)
}