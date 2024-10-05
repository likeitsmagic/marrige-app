import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { Campaign } from './entities/campaign.entity';

@Injectable()
export class CampaignsService {
  private readonly logger = new Logger(CampaignsService.name);

  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  async create(ownerId: string, createCampaignDto: CreateCampaignDto) {
    return this.campaignRepository.save({
      ...createCampaignDto,
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
