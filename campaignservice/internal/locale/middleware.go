package locale

import (
	"github.com/gin-gonic/gin"
)

func LocaleMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		acceptLanguage := c.GetHeader("Accept-Language")
		if acceptLanguage == "" {
			acceptLanguage = "ru"
		}

		c.Set("locale", acceptLanguage)

		c.Next()
	}
}
