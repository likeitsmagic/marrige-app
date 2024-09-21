import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdvantagesService } from 'src/advantages/advantages.service';
import { Repository } from 'typeorm';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { Campaign } from './entities/campaign.entity';

@Injectable()
export class CampaignsService {
  private readonly logger = new Logger(CampaignsService.name);

  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    private readonly advantagesService: AdvantagesService,
  ) {}

  async create(ownerId: string, createCampaignDto: CreateCampaignDto) {

    const advantages = await this.advantagesService.findManyById(
      createCampaignDto.advantages,
    );
    
    return this.campaignRepository.save({
      ...createCampaignDto,
      ownerId,
      advantages,
    });
  }

  async findAll() {
    return this.campaignRepository.find({
      relations: ['advantages'],
    });
  }
}
