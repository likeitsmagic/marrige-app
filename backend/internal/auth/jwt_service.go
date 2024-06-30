package auth

import (
	"fmt"
	"marriage-service/internal/config"
	"time"

	"github.com/golang-jwt/jwt"
)

type JWTService struct {
	accessSecret  string
	refreshSecret string
	accessExpire  time.Duration
	refreshExpire time.Duration
}

func NewJWTService(config *config.Config) *JWTService {
	return &JWTService{
		accessSecret:  config.AccessSecret,
		refreshSecret: config.RefreshSecret,
		accessExpire:  time.Minute,
		refreshExpire: time.Hour * 24 * 30,
	}
}

func (s *JWTService) GenerateAccessToken(userID uint) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(s.accessExpire).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(s.accessSecret))
}

func (s *JWTService) GenerateRefreshToken(userID uint) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(s.refreshExpire).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(s.refreshSecret))
}

func (s *JWTService) ValidateToken(tokenString string, isRefresh bool) (*jwt.Token, error) {
	secret := s.accessSecret
	if isRefresh {
		secret = s.refreshSecret
	}

	return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret), nil
	})
}
