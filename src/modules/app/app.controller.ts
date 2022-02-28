import { Controller, Get, HttpStatus } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAccessDeniedMessage(): unknown {
    return {
      statusCode: HttpStatus.OK,
      message: this.appService.getAccessDeniedMessage(),
    };
  }
}
