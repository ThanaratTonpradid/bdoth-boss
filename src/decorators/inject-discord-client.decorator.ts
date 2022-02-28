import { Inject } from '@nestjs/common';

import { ServiceName } from '../constants';

export function InjectDiscordClient(): ParameterDecorator {
  return Inject(ServiceName.DISCORD);
}
