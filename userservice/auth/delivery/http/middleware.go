package http

import (
	"net/http"
	"strings"

	"github.com/moyasvadba/userservice/internal/logger"
	"github.com/moyasvadba/userservice/internal/token"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func JWTAuth(jwtService *token.JWTService, logger *logger.Logger) gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			logger.Error("Request does not contain an access token")
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Request does not contain an access token"})
			c.Abort()
			return
		}

		tokenString = strings.TrimPrefix(tokenString, "Bearer ")

		token, err := jwtService.ValidateToken(tokenString, false)
		if err != nil {
			logger.Error("Invalid access token")
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			c.Set("user_id", claims["sub"])
		} else {
			logger.Error("Invalid access token")
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid access token"})
			c.Abort()
			return
		}

		c.Next()
	}
}
