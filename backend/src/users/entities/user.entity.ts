import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from '../enums/permissions/permission.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: false })
  isConfirmed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  confirmedAt: Date;

  @Column({ type: 'enum', enum: Permission, array: true, default: [] })
  permissions: Permission[];

  @Column({ default: false })
  isBanned: boolean;

  @Column({ type: 'text', nullable: true })
  banReason: string;

  @Column({ type: 'timestamp', nullable: true })
  bannedAt: Date;

  @Column({ nullable: true })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
