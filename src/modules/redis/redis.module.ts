import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { RedisConfig } from '../../configs';
import { ConfigName, ServiceName } from '../../constants';

@Module({})
export class RedisModule {
  static registerRedisSchedule(): DynamicModule {
    const RedisScheduleProvider = {
      provide: ServiceName.REDIS_SCHEDULE,
      useFactory: (configService: ConfigService): Redis.Redis => {
        const redisConfig = configService.get<RedisConfig>(ConfigName.REDIS);
        const redis = new Redis(redisConfig.redisScheduleUrl, redisConfig.options);
        return redis;
      },
      inject: [ConfigService],
    };
    return {
      module: RedisModule,
      providers: [RedisScheduleProvider],
      exports: [RedisScheduleProvider],
    };
  }
}
