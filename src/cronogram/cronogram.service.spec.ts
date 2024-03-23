import { Test, TestingModule } from '@nestjs/testing';
import { CronogramService } from './cronogram.service';

describe('CronogramService', () => {
  let service: CronogramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CronogramService],
    }).compile();

    service = module.get<CronogramService>(CronogramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
