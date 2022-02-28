import { Inject } from '@nestjs/common';

import { ServiceName } from '../constants';

export function InjectRedisSchedule(): ParameterDecorator {
  return Inject(ServiceName.REDIS_SCHEDULE);
}
