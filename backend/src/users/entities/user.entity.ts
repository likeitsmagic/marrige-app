import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Point,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from '../enums/permissions/permission.enum';
import { AuthProvider } from '../enums/auth-providers/auth-provider.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  externalId: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  avatarUrl: string;

  @Column({ nullable: false, default: '' })
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

  @Column({ default: '' })
  birthDate: string;

  @Column({ type: 'geometry', srid: 4326, nullable: true })
  location: Point;

  @Column({ type: 'enum', enum: AuthProvider, default: AuthProvider.EMAIL })
  authProvider: AuthProvider;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
