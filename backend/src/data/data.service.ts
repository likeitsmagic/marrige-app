import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DataService {
  constructor(private readonly configService: ConfigService) {}

  async getYandexMapsApiKey() {
    return this.configService.get('YANDEX_MAPS_API_KEY');
  }
}
