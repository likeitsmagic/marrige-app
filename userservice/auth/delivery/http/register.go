package http

import (
	"github.com/moyasvadba/userservice/auth"

	"github.com/gin-gonic/gin"
)

func RegisterHTTPEndpoints(router *gin.RouterGroup, uc auth.UseCase) {
	h := NewHandler(uc)

	authEndpoints := router.Group("/auth")
	{
		authEndpoints.POST("/signup", h.SignUp)
		authEndpoints.POST("/signin", h.SignIn)
		authEndpoints.POST("/refresh", h.UpdateTokens)
	}
}
