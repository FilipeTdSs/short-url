import { Test, TestingModule } from '@nestjs/testing';
import { CutterUrlController } from './cutter-url.controller';
import { CutterUrlService } from './cutter-url.service';

describe('CutterUrlController', () => {
  let controller: CutterUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CutterUrlController],
      providers: [CutterUrlService],
    }).compile();

    controller = module.get<CutterUrlController>(CutterUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
