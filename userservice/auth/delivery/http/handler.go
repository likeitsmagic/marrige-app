package http

import (
	"net/http"
	"time"

	"github.com/moyasvadba/userservice/auth"
	"github.com/moyasvadba/userservice/internal/logger"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	useCase auth.UseCase
	logger *logger.Logger
}

func NewHandler(useCase auth.UseCase, logger *logger.Logger) *Handler {
	return &Handler{
		useCase: useCase,
		logger: logger,
	}
}

type signInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Business bool   `json:"business"`
}

func (h *Handler) SignUp(c *gin.Context) {
	inp := new(signInput)

	if err := c.BindJSON(inp); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	tokens, err := h.useCase.SignUp(c.Request.Context(), inp.Email, inp.Password, inp.Business)
	if err != nil {
		if err == auth.ErrUserAlreadyExists {
			c.AbortWithStatusJSON(http.StatusConflict, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusCreated, signInResponse{
		AccessToken:  tokens.AccessToken,
		RefreshToken: tokens.RefreshToken,
	})
}

type signInResponse struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

func (h *Handler) SignIn(c *gin.Context) {
	inp := new(signInput)

	if err := c.BindJSON(inp); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	tokens, err := h.useCase.SignIn(c.Request.Context(), inp.Email, inp.Password)
	if err != nil {
		if err == auth.ErrInvalidCredentials {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, signInResponse{
		AccessToken:  tokens.AccessToken,
		RefreshToken: tokens.RefreshToken,
	})
}

type updateTokensInput struct {
	RefreshToken string `json:"refresh_token"`
}

func (h *Handler) UpdateTokens(c *gin.Context) {
	inp := new(updateTokensInput)

	if err := c.BindJSON(inp); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	tokens, err := h.useCase.UpdateTokens(c.Request.Context(), inp.RefreshToken)
	if err != nil {
		if err == auth.ErrInvalidCredentials {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, signInResponse{
		AccessToken:  tokens.AccessToken,
		RefreshToken: tokens.RefreshToken,
	})
}

type meResponse struct {
	ID      string `json:"id"`
	Email       string   `json:"email"`
	Permissions []string `json:"permissions"`
	IsBanned    bool     `json:"is_banned"`
	BanReason   string   `json:"ban_reason"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

func (h *Handler) Me(c *gin.Context) {
	userID, ok := c.Get("user_id")

	if !ok {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	user, err := h.useCase.Me(c.Request.Context(), userID.(string))
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, meResponse{
		ID:        user.ID.String(),
		Email:     user.Email,
		Permissions: user.GetPermissions(),
		IsBanned:    user.IsBanned,
		BanReason:   user.BanReason,
		CreatedAt:   user.CreatedAt,
		UpdatedAt:   user.UpdatedAt,
	})
}
