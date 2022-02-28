import { Controller, Get, HttpStatus } from '@nestjs/common';

import { TriggerService } from './trigger.service';

@Controller('discord')
export class TriggerController {
  constructor(private readonly service: TriggerService) {}

  @Get('send')
  getAccessDeniedMessage(): unknown {
    return {
      statusCode: HttpStatus.OK,
      message: this.service.sendMessageToDiscordId(),
    };
  }
}
