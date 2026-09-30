import { Controller, Post, Body, Get, Param, Redirect } from '@nestjs/common';
import { CutterUrlService } from './cutter-url.service';
import { CreateCutterUrlDto } from './dto/create-cutter-url.dto';

@Controller('cutter-url')
export class CutterUrlController {
  constructor(private readonly cutterUrlService: CutterUrlService) {}

  @Post()
  cutterUrl(@Body() createCutterUrlDto: CreateCutterUrlDto) {
    return this.cutterUrlService.cutterUrl(createCutterUrlDto.rawUrl);
  }

  @Get(':shortUrl')
  @Redirect()
  async getShorterUrl(@Param('shortUrl') shortUrl: string) {
    const url = await this.cutterUrlService.getShorterUrl(shortUrl);
    return { url, statusCode: 302 };
  }
}
