package http

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/moyasvadba/campaignservice/advantage"
	"github.com/moyasvadba/campaignservice/models"
)

type Handler struct {
	useCase advantage.UseCase
}

func NewHandler(useCase advantage.UseCase) *Handler {
	return &Handler{useCase: useCase}
}

type advantageInput struct {
	Type string `json:"type"`
	NameRU string `json:"name_ru"`
	NameEN string `json:"name_en"`
	NameFR string `json:"name_fr"`
}

func (h *Handler) CreateAdvantage(c *gin.Context) {
	inp := new(advantageInput)

	if err := c.BindJSON(inp); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	advantage, err := h.useCase.Create(c, &models.Advantage{
		Type: inp.Type,
		NameRU: inp.NameRU,
		NameEN: inp.NameEN,
		NameFR: inp.NameFR,
	})
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusCreated, advantage)
}

type advantagesInput struct {
	Advantages []advantageInput `json:"advantages"`
}

func (h *Handler) CreateAdvantages(c *gin.Context) {
	inp := new(advantagesInput)

	if err := c.BindJSON(inp); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	var advantages []*models.Advantage
	for _, adv := range inp.Advantages {
		advantages = append(advantages, &models.Advantage{
			Type: adv.Type,
			NameRU: adv.NameRU,
			NameEN: adv.NameEN,
			NameFR: adv.NameFR,
		})
	}

	createdAdvantages, err := h.useCase.CreateMany(c, advantages)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusCreated, createdAdvantages)
}

func (h *Handler) GetAdvantages(c *gin.Context) {
	advantages, err := h.useCase.GetAll(c)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, advantages)
}

func (h *Handler) GetAdvantagesByType(c *gin.Context) {
	typeParam := c.Param("type")

	advantages, err := h.useCase.GetByType(c, typeParam)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, advantages)
}

func (h *Handler) GetAdvantageByID(c *gin.Context) {
	id := c.Param("id")

	advantageId, err := uuid.Parse(id)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	advantage, err := h.useCase.GetByID(c, advantageId)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, advantage)
}

func (h *Handler) UpdateAdvantage(c *gin.Context) {
	id := c.Param("id")

	inp := new(advantageInput)

	if err := c.BindJSON(inp); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	advantageId, err := uuid.Parse(id)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	advantage := &models.Advantage{
		ID: advantageId,
		Type: inp.Type,
		NameRU: inp.NameRU,
		NameEN: inp.NameEN,
		NameFR: inp.NameFR,
	}

	err = h.useCase.Update(c, advantage)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusNoContent)
}

func (h *Handler) DeleteAdvantage(c *gin.Context) {
	id := c.Param("id")

	advantageId, err := uuid.Parse(id)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	err = h.useCase.Delete(c, advantageId)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusNoContent)
}

type advantageIDsInput struct {
	IDs []string `json:"ids"`
}

func (h *Handler) DeleteAdvantages(c *gin.Context) {
	inp := new(advantageIDsInput)

	if err := c.BindJSON(inp); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	var ids []uuid.UUID
	for _, id := range inp.IDs {
		parsedId, err := uuid.Parse(id)
		if err != nil {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}
		ids = append(ids, parsedId)
	}

	err := h.useCase.DeleteMany(c, ids)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusOK)
}
