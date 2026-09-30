import { Test, TestingModule } from '@nestjs/testing';
import { CutterUrlService } from './cutter-url.service';

describe('CutterUrlService', () => {
  let service: CutterUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CutterUrlService],
    }).compile();

    service = module.get<CutterUrlService>(CutterUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
