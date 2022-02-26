import { Test, TestingModule } from '@nestjs/testing';
import { CowsController } from './cows.controller';

describe('CowsController', () => {
  let controller: CowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CowsController],
    }).compile();

    controller = module.get<CowsController>(CowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
