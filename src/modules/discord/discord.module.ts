import { Logger } from '@dollarsign/logger';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Intents } from 'discord.js';

import { DiscordConfig } from '../../configs';
import { ConfigName, ServiceName } from '../../constants';

@Module({})
export class DiscordModule {
  static registerDiscordClient(): DynamicModule {
    const logger = new Logger(DiscordModule.name);
    const DiscordProvider = {
      provide: ServiceName.DISCORD,
      useFactory: (configService: ConfigService): Client => {
        const discordConfig = configService.get<DiscordConfig>(ConfigName.DISCORD);
        const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
        client.on('ready', () => {
          logger.verbose('discord client ready');
        });
        client.login(discordConfig.discordToken);
        return client;
      },
      inject: [ConfigService],
    };
    return {
      module: DiscordModule,
      providers: [DiscordProvider],
      exports: [DiscordProvider],
    };
  }
}
