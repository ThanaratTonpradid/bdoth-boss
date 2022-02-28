import { Global, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { RedisModule } from '../redis/redis.module';
import { DiscordModule } from '../discord/discord.module';

@Global()
@Module({
  imports: [DiscordModule.registerDiscordClient(), RedisModule.registerRedisSchedule(), ScheduleModule.forRoot()],
  exports: [DiscordModule, RedisModule],
})
export class BootstrapModule {}
