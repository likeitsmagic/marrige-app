package middleware

import (
	"context"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	pb "github.com/moyasvadba/campaignservice/proto"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/status"
)

func PermissionAuth(permissions []string) gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Request does not contain an access token"})
			c.Abort()
			return
		}

		tokenString = strings.TrimPrefix(tokenString, "Bearer ")

		conn, err := grpc.NewClient("userservice:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
		if err != nil {
			log.Fatalf("failed to connect to gRPC server at localhost:50051: %v", err)
		}
		defer conn.Close()
		client := pb.NewAuthServiceClient(conn)

		ctx, cancel := context.WithTimeout(context.Background(), time.Second)
		defer cancel()

		r, err := client.PermissionAuth(ctx, &pb.PermissionAuthRequest{
			Token:       tokenString,
			Permissions: permissions,
		})
		if err != nil {
			st, _ := status.FromError(err)

			if st.Code() == codes.Unauthenticated {
				c.AbortWithStatus(http.StatusUnauthorized)
				return
			}

			if st.Code() == codes.PermissionDenied {
				c.AbortWithStatus(http.StatusForbidden)
				return
			}

			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		c.Set("id", r.GetId())
		c.Set("email", r.GetEmail())
		c.Set("permissions", r.GetPermissions())

		c.Next()
	}
}
