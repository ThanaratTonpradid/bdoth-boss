import { registerAs } from '@nestjs/config';

import { ConfigName } from '../constants';

export interface DiscordConfig {
  discordToken: string;
}

export const discordConfig = registerAs(
  ConfigName.DISCORD,
  (): DiscordConfig => ({
    discordToken: process.env.DISCORD_TOKEN,
  }),
);
