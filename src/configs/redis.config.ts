import { registerAs } from '@nestjs/config';
import { RedisOptions } from 'ioredis';

import { ConfigName } from '../constants';

export interface RedisConfig {
  options: RedisOptions;
  redisScheduleUrl: string;
}

export const redisConfig = registerAs(
  ConfigName.REDIS,
  (): RedisConfig => ({
    redisScheduleUrl: process.env.REDIS_SCHEDULE_URL,
    options: {
      maxRetriesPerRequest: null,
      enableOfflineQueue: true,
      enableReadyCheck: true,
    },
  }),
);
