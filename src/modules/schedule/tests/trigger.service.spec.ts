import { Test, TestingModule } from '@nestjs/testing';

import { TriggerService } from '../trigger.service';
import { Second, ServiceName } from '../../../constants';
import { DateTimeUtils } from '../../../utils/date-time';
import * as Discord from 'discord.js';

jest.mock('@dollarsign/logger');
jest.mock('discord.js');
jest.mock('../../../utils/date-time');

describe('TriggerService', () => {
  let service: TriggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TriggerService, { provide: ServiceName.DISCORD, useClass: Discord.Client }],
    }).compile();

    service = module.get<TriggerService>(TriggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('triggerDelayedWorldBoss()', () => {
    it('should not call service.isItTime() and service.sendMessage()', async () => {
      jest.spyOn(DateTimeUtils, 'currentHour').mockReturnValueOnce(1);
      jest.spyOn(service, 'getBossName').mockReturnValueOnce('bossname');
      const spyIsItTime = jest.spyOn(service, 'isItTime').mockReturnValueOnce({ isItTime: true, suffix: 'bossname' });
      const spySendMessage = jest.spyOn(service, 'sendMessage').mockReturnValueOnce('bossname');
      await service.triggerDelayedWorldBoss();
      expect(spyIsItTime).not.toHaveBeenCalled();
      expect(spySendMessage).not.toHaveBeenCalled();
    });

    it('should call service.isItTime(Second.THIRTY_MINUTES) and service.sendMessage()', async () => {
      jest.spyOn(DateTimeUtils, 'currentHour').mockReturnValueOnce(0);
      jest.spyOn(service, 'getBossName').mockReturnValueOnce('bossname');
      const spyIsItTime = jest.spyOn(service, 'isItTime').mockReturnValueOnce({ isItTime: true, suffix: 'bossname' });
      const spySendMessage = jest.spyOn(service, 'sendMessage').mockReturnValueOnce('bossname');
      await service.triggerDelayedWorldBoss();
      expect(spyIsItTime).toHaveBeenCalledWith(Second.THIRTY_MINUTES);
      expect(spySendMessage).toHaveBeenCalledWith(true, 'bossname');
    });

    it('should call service.isItTime(Second.THIRTY_MINUTES) and service.sendMessage()', async () => {
      jest.spyOn(DateTimeUtils, 'currentHour').mockReturnValueOnce(9);
      jest.spyOn(service, 'getBossName').mockReturnValueOnce('bossname');
      const spyIsItTime = jest.spyOn(service, 'isItTime').mockReturnValueOnce({ isItTime: true, suffix: 'bossname' });
      const spySendMessage = jest.spyOn(service, 'sendMessage').mockReturnValueOnce('bossname');
      await service.triggerDelayedWorldBoss();
      expect(spyIsItTime).toHaveBeenCalledWith(Second.SIXTY_MINUTES);
      expect(spySendMessage).toHaveBeenCalledWith(true, 'bossname');
    });
  });

  describe('getBossName()', () => {
    it('should return null when bossname key invalid', () => {
      jest.spyOn(DateTimeUtils, 'currentDay').mockReturnValueOnce('0');
      const res = service.getBossName('00:00');
      expect(res).toBeNull();
    });

    it('should return bossname when bossname key valid', () => {
      jest.spyOn(DateTimeUtils, 'currentDay').mockReturnValueOnce('0');
      const res = service.getBossName('00:30');
      expect(res).not.toBeNull();
    });
  });

  describe('isItTime()', () => {
    it('should return true when remain time is THIRTY_MINUTES case isItTime(Second.THIRTY_MINUTES)', () => {
      jest.spyOn(DateTimeUtils, 'currentMinute').mockReturnValueOnce(0);
      const res = service.isItTime(Second.THIRTY_MINUTES);
      expect(res.isItTime).toBeTruthy();
    });

    it('should return true when remain time is FIFTEEN_MINUTES case isItTime(Second.THIRTY_MINUTES)', () => {
      jest.spyOn(DateTimeUtils, 'currentMinute').mockReturnValueOnce(15);
      const res = service.isItTime(Second.THIRTY_MINUTES);
      expect(res.isItTime).toBeTruthy();
    });

    it('should return true when remain time is FIVE_MINUTES case isItTime(Second.THIRTY_MINUTES)', () => {
      jest.spyOn(DateTimeUtils, 'currentMinute').mockReturnValueOnce(25);
      const res = service.isItTime(Second.THIRTY_MINUTES);
      expect(res.isItTime).toBeTruthy();
    });

    it('should return false when remain time is over THIRTY_MINUTES case isItTime(Second.THIRTY_MINUTES)', () => {
      jest.spyOn(DateTimeUtils, 'currentMinute').mockReturnValueOnce(30);
      const res = service.isItTime(Second.THIRTY_MINUTES);
      expect(res.isItTime).toBeFalsy();
    });

    it('should return false when remain time is less FIVE_MINUTES case isItTime(Second.THIRTY_MINUTES)', () => {
      jest.spyOn(DateTimeUtils, 'currentMinute').mockReturnValueOnce(55);
      const res = service.isItTime(Second.THIRTY_MINUTES);
      expect(res.isItTime).toBeFalsy();
    });

    it('should return true when remain time is THIRTY_MINUTES case isItTime(Second.SIXTY_MINUTES)', () => {
      jest.spyOn(DateTimeUtils, 'currentMinute').mockReturnValueOnce(30);
      const res = service.isItTime(Second.SIXTY_MINUTES);
      expect(res.isItTime).toBeTruthy();
    });

    it('should return true when remain time is FIFTEEN_MINUTES case isItTime(Second.SIXTY_MINUTES)', () => {
      jest.spyOn(DateTimeUtils, 'currentMinute').mockReturnValueOnce(45);
      const res = service.isItTime(Second.SIXTY_MINUTES);
      expect(res.isItTime).toBeTruthy();
    });

    it('should return true when remain time is FIVE_MINUTES case isItTime(Second.SIXTY_MINUTES)', () => {
      jest.spyOn(DateTimeUtils, 'currentMinute').mockReturnValueOnce(55);
      const res = service.isItTime(Second.SIXTY_MINUTES);
      expect(res.isItTime).toBeTruthy();
    });

    it('should return false when remain time is over THIRTY_MINUTES case isItTime(Second.SIXTY_MINUTES)', () => {
      jest.spyOn(DateTimeUtils, 'currentMinute').mockReturnValueOnce(0);
      const res = service.isItTime(Second.SIXTY_MINUTES);
      expect(res.isItTime).toBeFalsy();
    });

    it('should return false when remain time is less FIVE_MINUTES case isItTime(Second.SIXTY_MINUTES)', () => {
      jest.spyOn(DateTimeUtils, 'currentMinute').mockReturnValueOnce(25);
      const res = service.isItTime(Second.SIXTY_MINUTES);
      expect(res.isItTime).toBeFalsy();
    });
  });

  describe('sendMessage()', () => {
    it('should return null when isItTime = false and bossname null', () => {
      const res = service.sendMessage(false, null);
      expect(res).toBeNull();
    });
    it('should return null when isItTime = false and bossname not null', () => {
      const res = service.sendMessage(false, `bossname`);
      expect(res).toBeNull();
    });
    it('should return null when isItTime = true and bossname null', () => {
      const res = service.sendMessage(true, null);
      expect(res).toBeNull();
    });
    it('should return bossname when isItTime = true and bossname not null', () => {
      const res = service.sendMessage(true, 'bossname');
      expect(res).not.toBeNull();
    });
  });
});
