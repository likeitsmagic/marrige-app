package repository

import (
	"context"

	"github.com/google/uuid"
	"github.com/moyasvadba/campaignservice/campaign"
	"github.com/moyasvadba/campaignservice/internal/logger"
	"github.com/moyasvadba/campaignservice/models"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type CampaignRepository struct {
	DB     *gorm.DB
	logger *logger.Logger
}

func NewCampaignRepository(db *gorm.DB, logger *logger.Logger) *CampaignRepository {
	return &CampaignRepository{DB: db, logger: logger}
}

func (r *CampaignRepository) Create(ctx context.Context, campaign campaign.CreateCampaignInput) (*models.Campaign, error) {

	activitySectorID, err := uuid.Parse(campaign.ActivitySectorID)
	if err != nil {
		return nil, err
	}

	ownerID, err := uuid.Parse(campaign.OwnerID)
	if err != nil {
		return nil, err
	}

	newCampaign := &models.Campaign{
		OwnerID: ownerID,
		Name: campaign.Name,
		Phone: campaign.Phone,
		Region: campaign.Region,
		ActivitySectorID: activitySectorID,
	}

	err = r.DB.Create(&newCampaign).Error
	if err != nil {
		r.logger.Info("Error creating campaign", zap.Error(err))
		return nil, err
	}
	return newCampaign, nil
}

func (r *CampaignRepository) GetAll(ctx context.Context) ([]*models.Campaign, error) {
	var campaigns []*models.Campaign
	err := r.DB.Preload("ActivitySector").Preload("ActivitySector.Advantages").Find(&campaigns).Error
	if err != nil {
		r.logger.Info("Error getting campaigns", zap.Error(err))
		return nil, err
	}
	return campaigns, nil
}

func (r *CampaignRepository) GetByID(ctx context.Context, id uuid.UUID) (*models.Campaign, error) {
	var campaign models.Campaign
	err := r.DB.Preload("ActivitySector").First(&campaign, id).Error
	if err != nil {
		r.logger.Info("Error getting campaign", zap.Error(err))
		return nil, err
	}
	return &campaign, nil
}
