import { Test, TestingModule } from '@nestjs/testing';
import { BrainDataService } from './brain_data.service';

describe('BrainDataService', () => {
  let service: BrainDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrainDataService],
    }).compile();

    service = module.get<BrainDataService>(BrainDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
