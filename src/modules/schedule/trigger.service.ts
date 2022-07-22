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
    const currentHour = DateTimeUtils.currentHour();
    const beforeHourIndex = bossHour.indexOf(currentHour + 1);
    const afterHourIndex = bossHour.indexOf(currentHour);
    if (beforeHourIndex !== -1) {
      const bossKey = bossTime[beforeHourIndex];
      const bossName = this.getBossName(bossKey);
      const targetBeforeHour = bossHour[beforeHourIndex];
      if (targetBeforeHour - currentHour === 1) {
        const target = targetBeforeHour === 1 ? Minutes.THIRTY_MINUTES : Minutes.SIXTY_MINUTES;
        const { isItTime, suffix } = this.isItTime(target);
        await this.sendMessage(isItTime, bossName, suffix);
      }
    }
    if (afterHourIndex !== -1) {
      const bossKey = bossTime[afterHourIndex];
      const bossName = this.getBossName(bossKey);
      const targetAfterHour = bossHour[afterHourIndex];
      if (targetAfterHour - currentHour === 0 && targetAfterHour !== 1) {
        const target = Minutes.ONE_MINITES - Minutes.ONE_MINITES;
        const { isItTime, suffix } = this.isItTime(target);
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
    if (remainMinute - currentMinute === 0) {
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
