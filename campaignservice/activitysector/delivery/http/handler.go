package http

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/moyasvadba/campaignservice/activitysector"
	"gorm.io/gorm"
)

type Handler struct {
	useCase activitysector.UseCase
}

func NewHandler(useCase activitysector.UseCase) *Handler {
	return &Handler{useCase: useCase}
}

type activitysectorInput struct {
	Name       string   `json:"name"`
	Advantages []string `json:"advantages"`
}

func (h *Handler) CreateActivitySector(c *gin.Context) {
	inp := new(activitysectorInput)

	if err := c.BindJSON(inp); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	ac, err := h.useCase.CreateActivitySector(c, inp.Name, inp.Advantages)

	if err != nil {
		if err == gorm.ErrDuplicatedKey {
			c.AbortWithError(http.StatusConflict, activitysector.ErrActivitySectorAlreadyExists)
			return
		}
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusCreated, ac)
}

func (h *Handler) GetActivitySector(c *gin.Context) {
	id := c.Param("id")

	ac, err := h.useCase.GetActivitySector(c, id)

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			c.AbortWithError(http.StatusNotFound, activitysector.ErrActivitySectorNotFound)
			return
		}
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, ac)
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
	inp := new(activitysectorInput)

	if err := c.BindJSON(inp); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	updatedActivitySector, err := h.useCase.UpdateActivitySector(c, id, inp.Name, inp.Advantages)

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			c.AbortWithError(http.StatusNotFound, activitysector.ErrActivitySectorNotFound)
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
			c.AbortWithError(http.StatusNotFound, activitysector.ErrActivitySectorNotFound)
			return
		}
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusOK)
}
