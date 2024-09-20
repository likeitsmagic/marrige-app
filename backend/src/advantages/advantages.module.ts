import { Module } from '@nestjs/common';
import { AdvantagesService } from './advantages.service';
import { AdvantagesController } from './advantages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advantage } from './entities/advantage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Advantage])],
  controllers: [AdvantagesController],
  providers: [AdvantagesService],
  exports: [AdvantagesService],
})
export class AdvantagesModule {}
