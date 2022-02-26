import { Test, TestingModule } from '@nestjs/testing';
import { CowsService } from './cows.service';

describe('CowsService', () => {
  let service: CowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CowsService],
    }).compile();

    service = module.get<CowsService>(CowsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
