import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { Campaign } from './entities/campaign.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialMedia } from './entities/social-media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign, SocialMedia])],
  controllers: [CampaignsController],
  providers: [CampaignsService],
})
export class CampaignsModule {}
