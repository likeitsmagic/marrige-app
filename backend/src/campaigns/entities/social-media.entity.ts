import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SocialMediaPlatformEnum } from '../enums/social-media.enum';
import { Campaign } from './campaign.entity';

@Entity('social_media')
export class SocialMedia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: true })
  campaignId: string;

  @Column({ type: 'enum', enum: SocialMediaPlatformEnum })
  platform: SocialMediaPlatformEnum;

  @Column()
  link: string;

  @ManyToOne(() => Campaign, (campaign) => campaign.socialMedias)
  campaign: Campaign;
}
