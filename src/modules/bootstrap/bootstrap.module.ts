import { Global, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { DiscordModule } from '../discord/discord.module';

@Global()
@Module({
  imports: [DiscordModule.registerDiscordClient(), ScheduleModule.forRoot()],
  exports: [DiscordModule],
})
export class BootstrapModule {}
