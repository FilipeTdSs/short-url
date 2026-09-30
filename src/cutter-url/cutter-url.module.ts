import { Module } from '@nestjs/common';
import { CutterUrlService } from './cutter-url.service';
import { CutterUrlController } from './cutter-url.controller';

@Module({
  controllers: [CutterUrlController],
  providers: [CutterUrlService],
})
export class CutterUrlModule {}
