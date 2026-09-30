import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CutterUrlModule } from './cutter-url/cutter-url.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CutterUrlModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
