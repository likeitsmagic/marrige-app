import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([RefreshToken]),
    JwtModule.register({
      global: true,
    }),
    HttpModule.register({
      withCredentials: true,
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
