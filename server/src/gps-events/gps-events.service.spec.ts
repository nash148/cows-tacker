import { Test, TestingModule } from '@nestjs/testing';
import { GpsEventsService } from './gps-events.service';

describe('GpsEventsService', () => {
  let service: GpsEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GpsEventsService],
    }).compile();

    service = module.get<GpsEventsService>(GpsEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
