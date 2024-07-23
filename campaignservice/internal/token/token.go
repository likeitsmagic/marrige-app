package token

import (
	"fmt"
	"time"

	"github.com/moyasvadba/campaignservice/internal/config"

	"github.com/golang-jwt/jwt"
)

type JWTService struct {
	accessSigningKey      string
	accessExpireDuration  time.Duration
	refreshSigningKey     string
	refreshExpireDuration time.Duration
}

func NewJWTService(config *config.Config) *JWTService {
	return &JWTService{
		accessSigningKey:      config.AccessSecret,
		refreshSigningKey:     config.RefreshSecret,
		accessExpireDuration:  time.Minute,
		refreshExpireDuration: time.Hour * 24 * 30,
	}
}

func (s *JWTService) GenerateAccessToken(userID string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(s.accessExpireDuration).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(s.accessSigningKey))
}

func (s *JWTService) GenerateRefreshToken(userID string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(s.refreshExpireDuration).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(s.refreshSigningKey))
}

func (s *JWTService) ValidateToken(tokenString string, isRefresh bool) (*jwt.Token, error) {
	secret := s.accessSigningKey
	if isRefresh {
		secret = s.refreshSigningKey
	}

	return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret), nil
	})
}
