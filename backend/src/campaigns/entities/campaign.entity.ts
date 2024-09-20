import { Advantage } from 'src/advantages/entities/advantage.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  Point,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('campaigns')
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: true })
  ownerId: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ type: 'geometry', srid: 4326 })
  location: Point;

  @ManyToMany(() => Advantage)
  @JoinTable({
    name: 'campaign_advantages',
    joinColumn: { name: 'campaignId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'advantageId', referencedColumnName: 'id' },
  })
  advantages: Advantage[];

  @Column({ type: 'boolean', default: false })
  isReady: boolean;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
