import { Test, TestingModule } from '@nestjs/testing';
import { AdvantagesController } from './advantages.controller';
import { AdvantagesService } from './advantages.service';

describe('AdvantagesController', () => {
  let controller: AdvantagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvantagesController],
      providers: [AdvantagesService],
    }).compile();

    controller = module.get<AdvantagesController>(AdvantagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
