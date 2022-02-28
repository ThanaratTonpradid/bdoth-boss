import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DefaultMessage } from '../../../constants';

import { AppController } from '../app.controller';
import { AppService } from '../app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getAccessDeniedMessage', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getAccessDeniedMessage()).toEqual({
        statusCode: HttpStatus.OK,
        message: DefaultMessage.ACCESS_DENIED,
      });
    });
  });
});
