import { Injectable } from '@nestjs/common';

import { DefaultMessage } from '../../constants';

@Injectable()
export class AppService {
  private accessDeniedMessage = DefaultMessage.ACCESS_DENIED;

  getAccessDeniedMessage(): string {
    return this.accessDeniedMessage;
  }
}
