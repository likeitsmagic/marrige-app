import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { Campaign } from './entities/campaign.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvantagesModule } from 'src/advantages/advantages.module';

@Module({
  imports: [AdvantagesModule, TypeOrmModule.forFeature([Campaign])],
  controllers: [CampaignsController],
  providers: [CampaignsService],
})
export class CampaignsModule {}
