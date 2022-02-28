import { Logger } from '@dollarsign/logger';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { TriggerService } from './trigger.service';

@Injectable()
export class ScheduleService implements OnModuleInit {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(private readonly triggerService: TriggerService) {}
  async onModuleInit(): Promise<void> {
    await this.delayedWorldBossHandleCron();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async delayedWorldBossHandleCron(): Promise<void> {
    await this.triggerService.triggerDelayedWorldBoss();
  }
}
