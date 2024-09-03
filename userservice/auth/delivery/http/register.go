package http

import (
	"github.com/moyasvadba/userservice/auth"
	"github.com/moyasvadba/userservice/internal/logger"
	"github.com/moyasvadba/userservice/internal/token"

	"github.com/gin-gonic/gin"
)

func RegisterHTTPEndpoints(router *gin.Engine, uc auth.UseCase, jwtService *token.JWTService, logger *logger.Logger) {
	h := NewHandler(uc, logger)

	authEndpoints := router.Group("/auth")
	{
		authEndpoints.POST("/signup", h.SignUp)
		authEndpoints.POST("/signin", h.SignIn)
		authEndpoints.POST("/refresh", h.UpdateTokens)
		authEndpoints.GET("/me", JWTAuth(jwtService, logger), h.Me)
	}
}
