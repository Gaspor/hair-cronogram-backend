import { Test, TestingModule } from '@nestjs/testing';
import { CronogramController } from './cronogram.controller';

describe('CronogramController', () => {
  let controller: CronogramController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CronogramController],
    }).compile();

    controller = module.get<CronogramController>(CronogramController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
