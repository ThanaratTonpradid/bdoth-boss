import { Logger } from '@dollarsign/logger';
import { Injectable } from '@nestjs/common';
import { Client, DMChannel } from 'discord.js';

import { bossByDay, bossHour, bossTime, Minutes } from '../../constants';
import { InjectDiscordClient } from '../../decorators';
import { DateTimeUtils } from '../../utils/date-time';

interface IsItTimePayload {
  isItTime: boolean;
  suffix: string | null;
}

@Injectable()
export class TriggerService {
  private readonly logger = new Logger(TriggerService.name);
  private readonly channelId = process.env.DISCORD_CHANNEL;

  constructor(
    @InjectDiscordClient()
    private readonly discordClient: Client,
  ) {}

  async triggerDelayedWorldBoss(): Promise<void> {
    this.logger.debug(this.triggerDelayedWorldBoss.name);
    const currentHour = DateTimeUtils.currentHour();
    const bossHourIndex = bossHour.indexOf(currentHour);
    const bossTimeKey = bossTime[bossHourIndex];
    const bossName = this.getBossName(bossTimeKey);
    if (bossHourIndex !== -1) {
      if (bossHourIndex === 0) {
        const { isItTime, suffix } = this.isItTime(Minutes.THIRTY_MINUTES);
        await this.sendMessage(isItTime, bossName, suffix);
      } else {
        const { isItTime, suffix } = this.isItTime(Minutes.SIXTY_MINUTES);
        await this.sendMessage(isItTime, bossName, suffix);
      }
    }
  }

  getBossName(time: string): string | null {
    const currentDay = DateTimeUtils.currentDay();
    return bossByDay[`${currentDay}-${time}`] ?? null;
  }

  isItTime(remainMinute: number): IsItTimePayload {
    const currentMinute = DateTimeUtils.currentMinute();
    this.logger.debug(remainMinute - currentMinute);
    if (remainMinute - currentMinute === Minutes.THIRTY_MINUTES) {
      return {
        isItTime: true,
        suffix: `จะปรากฏตัวอีก ${remainMinute - currentMinute} นาที`,
      };
    }
    if (remainMinute - currentMinute === Minutes.FIFTEEN_MINUTES) {
      return {
        isItTime: true,
        suffix: `จะปรากฏตัวอีก ${remainMinute - currentMinute} นาที`,
      };
    }
    if (remainMinute - currentMinute === Minutes.FIVE_MINUTES) {
      return {
        isItTime: true,
        suffix: `จะปรากฏตัวอีก ${remainMinute - currentMinute} นาที`,
      };
    }
    if (remainMinute - currentMinute === 0 || remainMinute - currentMinute === 60) {
      return {
        isItTime: true,
        suffix: `ปรากฏตัวแล้ว`,
      };
    }
    return {
      isItTime: false,
      suffix: null,
    };
  }

  async sendMessage(isItTime: boolean, bossName: string | null, suffix: string): Promise<string | null> {
    if (isItTime && bossName) {
      this.logger.info(`${bossName} ${suffix}`);
      await this.sendMessageToDiscordId(`${bossName} ${suffix}`);
      return bossName;
    }
    return null;
  }

  async sendMessageToDiscordId(message = 'content'): Promise<void> {
    const channel = this.discordClient.channels.cache.get(this.channelId) as DMChannel;
    const sendMessage = await channel.send(message);
    this.logger.debug(!!sendMessage);
  }
}
