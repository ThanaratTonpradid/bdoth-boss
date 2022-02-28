import { Module } from '@nestjs/common';

import { ScheduleService } from './schedule.service';
import { TriggerController } from './trigger.controller';
import { TriggerService } from './trigger.service';

@Module({
  imports: [],
  controllers: [TriggerController],
  providers: [ScheduleService, TriggerService],
})
export class ScheduleModule {}
