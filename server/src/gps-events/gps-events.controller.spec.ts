import { Test, TestingModule } from '@nestjs/testing';
import { GpsEventsController } from './gps-events.controller';

describe('GpsEventsController', () => {
  let controller: GpsEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GpsEventsController],
    }).compile();

    controller = module.get<GpsEventsController>(GpsEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
