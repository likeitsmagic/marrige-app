import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm/typorm';
import { AuthModule } from './auth/auth.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { AdvantagesModule } from './advantages/advantages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UsersModule,
    AuthModule,
    CampaignsModule,
    AdvantagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
