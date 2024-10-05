import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  Point,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CampaignStatusEnum } from '../enums/campaign-status.enum';
import { WeddingVendorTypeEnum } from '../enums/wedding-vendor-type.enum';
import { SocialMedia } from './social-media.entity';

@Entity('campaigns')
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: true })
  ownerId: string;

  @Column({
    type: 'enum',
    enum: WeddingVendorTypeEnum,
    default: WeddingVendorTypeEnum.NONE,
  })
  type: WeddingVendorTypeEnum;

  @Column({ type: 'text', array: true, default: [] })
  images: string[];

  @Column({ nullable: false })
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  phone: string;

  @Column({ type: 'geometry', srid: 4326 })
  location: Point;

  @Column({ default: '' })
  address: string;

  @Column({
    type: 'enum',
    enum: CampaignStatusEnum,
    default: CampaignStatusEnum.DRAFT,
  })
  status: CampaignStatusEnum;

  @Column({ type: 'integer', default: 0 })
  minPrice: number;

  @Column({ type: 'integer', default: 0 })
  maxPrice: number;

  @OneToMany(() => SocialMedia, (socialMedia) => socialMedia.campaign)
  socialMedias: SocialMedia[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
