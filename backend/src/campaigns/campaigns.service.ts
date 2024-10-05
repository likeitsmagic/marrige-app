import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { Campaign } from './entities/campaign.entity';
import { omit } from 'lodash';
import { CampaignStatusEnum } from './enums/campaign-status.enum';

@Injectable()
export class CampaignsService {
  private readonly logger = new Logger(CampaignsService.name);

  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  async createOrUpdate(ownerId: string, createCampaignDto: CreateCampaignDto) {
    const campaign = await this.campaignRepository.findOne({
      where: { ownerId },
    });

    if (campaign) {
      const newData = omit(createCampaignDto, ['socialMedias']);
      return this.campaignRepository.update(
        { id: campaign.id },
        {
          ...newData,
          status: CampaignStatusEnum.READY,
        },
      );
    }
    return this.campaignRepository.save({
      ...createCampaignDto,
      status: CampaignStatusEnum.READY,
      ownerId,
    });
  }

  async findAll() {
    return this.campaignRepository.find({
      relations: ['socialMedias'],
    });
  }

  async findByOwnerId(ownerId: string) {
    return this.campaignRepository.findOne({
      where: { ownerId },
      relations: ['socialMedias'],
    });
  }
}
