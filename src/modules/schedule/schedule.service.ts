import { Logger } from '@dollarsign/logger';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Redis } from 'ioredis';
import { v4 as getId } from 'uuid';

import { Second } from '../../constants';
import { InjectRedisSchedule } from '../../decorators';
import { TriggerService } from './trigger.service';

@Injectable()
export class ScheduleService implements OnModuleInit {
  private readonly logger = new Logger(ScheduleService.name);
  private readonly uuid: string;

  constructor(
    @InjectRedisSchedule()
    protected readonly redis: Redis,
    private readonly triggerService: TriggerService,
  ) {
    this.uuid = getId();
  }

  getTaskKey(name: string): string {
    return `Task:${name}`.toUpperCase();
  }

  getSettingKey(key: string): string {
    return `Setting:Enable:${key}`.toUpperCase();
  }

  async isAllowed(key: string): Promise<boolean> {
    const result = await this.redis.setnx(key, this.uuid);
    if (result === 1) {
      await this.redis.expire(key, Second.ONE_MINUTES);
      return true;
    }
    const existTtl = await this.redis.ttl(key);
    if (existTtl === -1) {
      await this.redis.expire(key, Second.ONE_MINUTES);
    }
    const uuid = await this.redis.get(key);
    return `${uuid}` === `${this.uuid}`;
  }

  async isEnabled(key: string): Promise<boolean> {
    const settingKey = this.getSettingKey(key);
    const result = await this.redis.get(settingKey);
    return result === '1';
  }

  async isAllowedAndEnabled(name: string): Promise<boolean> {
    const key = this.getTaskKey(name);
    if (await this.isAllowed(key)) {
      if (await this.isEnabled(key)) {
        return true;
      }
      this.logger.warn(`🚫 ${key} is disabled`);
    }
    return false;
  }

  async initSetting(name: string): Promise<void> {
    const taskKey = this.getTaskKey(name);
    const settingKey = this.getSettingKey(taskKey);
    const result = await this.redis.setnx(settingKey, '1');
    if (result === 1) {
      this.logger.verbose(`Init setting enabled: ${taskKey}`);
    }
  }

  async onModuleInit(): Promise<void> {
    await this.initSetting(this.delayedWorldBossHandleCron.name);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async delayedWorldBossHandleCron(): Promise<void> {
    const { name } = this.delayedWorldBossHandleCron;
    const isAllowedAndEnabled = await this.isAllowedAndEnabled(name);
    if (isAllowedAndEnabled) {
      await this.triggerService.triggerDelayedWorldBoss();
    }
  }
}
