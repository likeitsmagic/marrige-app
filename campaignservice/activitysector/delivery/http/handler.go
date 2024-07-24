package http

import (
	"net/http"

	"github.com/gin-gonic/gin"
	activirysector "github.com/moyasvadba/campaignservice/activitysector"
	"gorm.io/gorm"
)

type Handler struct {
	useCase activirysector.UseCase
}

func NewHandler(useCase activirysector.UseCase) *Handler {
	return &Handler{useCase: useCase}
}

type activirysectorInput struct {
	Name       string   `json:"name"`
	Advantages []string `json:"advanatages"`
}

func (h *Handler) CreateActivitySector(c *gin.Context) {
	inp := new(activirysectorInput)

	if err := c.BindJSON(inp); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	activitysector, err := h.useCase.CreateActivitySector(c, inp.Name, inp.Advantages)

	if err != nil {
		if err == gorm.ErrDuplicatedKey {
			c.AbortWithError(http.StatusConflict, activirysector.ErrActivitySectorAlreadyExists)
			return
		}
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusCreated, activitysector)
}

func (h *Handler) GetActivitySector(c *gin.Context) {
	id := c.Param("id")

	activitysector, err := h.useCase.GetActivitySector(c, id)

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			c.AbortWithError(http.StatusNotFound, activirysector.ErrActivitySectorNotFound)
			return
		}
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, activitysector)
}

func (h *Handler) GetActivitySectors(c *gin.Context) {
	activitysectors, err := h.useCase.GetActivitySectors(c)

	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, activitysectors)
}

func (h *Handler) UpdateActivitySector(c *gin.Context) {
	id := c.Param("id")
	inp := new(activirysectorInput)

	if err := c.BindJSON(inp); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	updatedActivitySector, err := h.useCase.UpdateActivitySector(c, id, inp.Name, inp.Advantages)

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			c.AbortWithError(http.StatusNotFound, activirysector.ErrActivitySectorNotFound)
			return
		}
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, updatedActivitySector)
}

func (h *Handler) DeleteActivitySector(c *gin.Context) {
	id := c.Param("id")

	err := h.useCase.DeleteActivitySector(c, id)

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			c.AbortWithError(http.StatusNotFound, activirysector.ErrActivitySectorNotFound)
			return
		}
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusOK)
}
