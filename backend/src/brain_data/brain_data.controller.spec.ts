import { Test, TestingModule } from '@nestjs/testing';
import { BrainDataController } from './brain_data.controller';
import { BrainDataService } from './brain_data.service';

describe('BrainDataController', () => {
  let controller: BrainDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrainDataController],
      providers: [BrainDataService],
    }).compile();

    controller = module.get<BrainDataController>(BrainDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
