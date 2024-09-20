import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { AdvantageType } from '../enums/advantage-type.enum';
import { Locale } from 'src/core/enums/locale.enum';

@Entity('advantages')
export class Advantage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  textRu: string;

  @Column({ nullable: false })
  textEn: string;

  @Column({ nullable: false })
  textFr: string;

  @Column({ type: 'enum', enum: AdvantageType, nullable: false })
  advantageType: AdvantageType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  getText(locale: Locale): string {
    return this[`text${locale}`];
  }
}
