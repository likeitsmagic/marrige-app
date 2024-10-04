import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserYandexDto } from './dto/create-user-yandex';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async createFromYandex(createUserYandexDto: CreateUserYandexDto) {
    return this.userRepository.save(createUserYandexDto);
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async findOneByExternalId(externalId: string) {
    return this.userRepository.findOneBy({ externalId });
  }
}
