import { Test, TestingModule } from '@nestjs/testing';
import { AdvantagesService } from './advantages.service';

describe('AdvantagesService', () => {
  let service: AdvantagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvantagesService],
    }).compile();

    service = module.get<AdvantagesService>(AdvantagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
