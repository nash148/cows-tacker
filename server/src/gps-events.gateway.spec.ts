import { Test, TestingModule } from '@nestjs/testing';
import { GpsEventsGateway } from './gps-events.gateway';

describe('GpsEventsGateway', () => {
  let gateway: GpsEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GpsEventsGateway],
    }).compile();

    gateway = module.get<GpsEventsGateway>(GpsEventsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
