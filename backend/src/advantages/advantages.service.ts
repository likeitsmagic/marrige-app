import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateAdvantageDto } from './dto/create-advantage.dto';
import { Advantage } from './entities/advantage.entity';

@Injectable()
export class AdvantagesService {
  constructor(
    @InjectRepository(Advantage)
    private readonly advantageRepository: Repository<Advantage>,
  ) {}

  async create(createAdvantageDto: CreateAdvantageDto) {
    const advantage = await this.advantageRepository.save({
      textRu: createAdvantageDto.textRu,
      textEn: createAdvantageDto.textEn,
      textFr: createAdvantageDto.textFr,
      advantageType: createAdvantageDto.advantageType,
    });

    return advantage;
  }

  async findManyById(ids: string[]) {
    return this.advantageRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async findAll() {
    return this.advantageRepository.find();
  }
}
