import { Injectable, NotFoundException } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { nanoid } from 'nanoid';



@Injectable()
export class CutterUrlService {
  private redisClient: RedisClientType;
  TIME_TO_LIVE_SECONDS = 60 * 60; // 1 Hora em segundos
  constructor() {
    this.redisClient = createClient({
      url: process.env.REDIS_URL,
    });
    this.redisClient.on('error', 
      (err) => console.error('Redis Client Error', err)
    );
    this.redisClient.connect().catch(
      (err) => console.error('Redis Client Connection Error', err)
    );
  }

  async cutterUrl(rawUrl: string): Promise<{ shortUrl: string }> {
    const shortUrl = nanoid(9);
    await this.redisClient.set(shortUrl, rawUrl, {
      expiration: {
        type: 'EX',
        value: this.TIME_TO_LIVE_SECONDS,
      },
    });

    const baseUrl = process.env.BASE_URL;
    return { shortUrl: `${baseUrl}/cutter-url/${shortUrl}` };
  }

  async getShorterUrl(shortUrl: string): Promise<string> {
    const url = await this.redisClient.get(shortUrl);
    if (!url) {
      throw new NotFoundException('URL not found');
    }
    return url;
  }
}

