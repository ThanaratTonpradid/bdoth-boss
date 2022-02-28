import { Test, TestingModule } from '@nestjs/testing';
import { Client } from 'discord.js';

import { TriggerService } from '../trigger.service';
import { Minutes, ServiceName } from '../../../constants';
import { DateTimeUtils } from '../../../utils/date-time';

jest.mock('@dollarsign/logger');
jest.mock('discord.js');
jest.mock('../../../utils/date-time');

describe('TriggerService', () => {
  let service: TriggerService;
  let discordClient: Client;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [TriggerService, { provide: ServiceName.DISCORD, useClass: Client }],
    }).compile();

    service = module.get<TriggerService>(TriggerService);
    discordClient = module.get<Client>(ServiceName.DISCORD);
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(discordClient).toBeDefined();
  });

  describe('triggerDelayedWorldBoss()', () => {
    it('should not call service.isItTime() and service.sendMessage()', async () => {
      jest.spyOn(DateTimeUtils, 'currentHour').mockReturnValueOnce(1);
      jest.spyOn(service, 'getBossName').mockReturnValueOnce('bossname');
      const spyIsItTime = jest.spyOn(service, 'isItTime').mockReturnValueOnce({ isItTime: true, suffix: 'bossname' });
      const spySendMessage = jest.spyOn(service, 'sendMessage').mockResolvedValueOnce('bossname');
      await service.triggerDelayedWorldBoss();
      expect(spyIsItTime).not.toHaveBeenCalled();
      expect(spySendMessage).not.toHaveBeenCalled();
    });

    it('should call service.isItTime(Minutes.THIRTY_MINUTES) and service.sendMessage()', async () => {
      jest.spyOn(DateTimeUtils, 'currentHour').mockReturnValueOnce(0);
      jest.spyOn(service, 'getBossName').mockReturnValueOnce('bossname');
      const spyIsItTime = jest.spyOn(service, 'isItTime').mockReturnValueOnce({ isItTime: true, suffix: 'bossname' });
      const spySendMessage = jest.spyOn(service, 'sendMessage').mockResolvedValueOnce('bossname');
      await service.triggerDelayedWorldBoss();
      expect(spyIsItTime).toHaveBeenCalledWith(Minutes.THIRTY_MINUTES);
      expect(spySendMessage).toHaveBeenCalledWith(true, 'bossname', 'bossname');
    });

    it('should call service.isItTime(Minutes.THIRTY_MINUTES) and service.sendMessage()', async () => {
      jest.spyOn(DateTimeUtils, 'currentHour').mockReturnValueOnce(9);
      jest.spyOn(service, 'getBossName').mockReturnValueOnce('bossname');
      const spyIsItTime = jest.spyOn(service, 'isItTime').mockReturnValueOnce({ isItTime: true, suffix: 'bossname' });
      const spySendMessage = jest.spyOn(service, 'sendMessage').mockResolvedValueOnce('bossname');
      await service.triggerDelayedWorldBoss();
      expect(spyIsItTime).toHaveBeenCalledWith(Minutes.SIXTY_MINUTES);
      expect(spySendMessage).toHaveBeenCalledWith(true, 'bossname', 'bossname');
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
    it('should return true when remain time is THIRTY_MINUTES case isItTime(Minutes.THIRTY_MINUTES)', () => {
      jest.spyOn(DateTimeUtils, 'currentMinute').mockReturnValueOnce(0);
      const res = service.isItTime(Minutes.THIRTY_MINUTES);
      expect(res.isItTime).toBeTruthy();
    });

    it('should return true when remain time is FIFTEEN_MINUTES case isItTime(Minutes.THIRTY_MINUTES)', () => {
      jest.spyOn(DateTimeUtils, 'currentMinute').mockReturnValueOnce(15);
      const res = service.isItTime(Minutes.THIRTY_MINUTES);
      expect(res.isItTime).toBeTruthy();
    });

    it('should return true when remain time is FIVE_MINUTES case isItTime(Minutes.THIRTY_MINUTES)', () => {
      jest.spyOn(DateTimeUtils, 'currentMinute').mockReturnValueOnce(25);
      const res = service.isItTime(Minutes.THIRTY_MINUTES);
      expect(res.isItTime).toBeTruthy();
    });

    it('should return false when remain time is current time case isItTime(Minutes.THIRTY_MINUTES)', () => {
      jest.spyOn(DateTimeUtils, 'currentMinute').mockReturnValueOnce(30);
      const res = service.isItTime(Minutes.THIRTY_MINUTES);
      expect(res.isItTime).toBeTruthy();
    });

    it('should return false when remain time is over time case isItTime(Minutes.THIRTY_MINUTES)', () => {
      jest.spyOn(DateTimeUtils, 'currentMinute').mockReturnValueOnce(35);
      const res = service.isItTime(Minutes.THIRTY_MINUTES);
      expect(res.isItTime).toBeFalsy();
    });

    it('should return true when remain time is THIRTY_MINUTES case isItTime(Minutes.SIXTY_MINUTES)', () => {
      jest.spyOn(DateTimeUtils, 'currentMinute').mockReturnValueOnce(30);
      const res = service.isItTime(Minutes.SIXTY_MINUTES);
      expect(res.isItTime).toBeTruthy();
    });

    it('should return true when remain time is FIFTEEN_MINUTES case isItTime(Minutes.SIXTY_MINUTES)', () => {
      jest.spyOn(DateTimeUtils, 'currentMinute').mockReturnValueOnce(45);
      const res = service.isItTime(Minutes.SIXTY_MINUTES);
      expect(res.isItTime).toBeTruthy();
    });

    it('should return true when remain time is FIVE_MINUTES case isItTime(Minutes.SIXTY_MINUTES)', () => {
      jest.spyOn(DateTimeUtils, 'currentMinute').mockReturnValueOnce(55);
      const res = service.isItTime(Minutes.SIXTY_MINUTES);
      expect(res.isItTime).toBeTruthy();
    });

    it('should return false when remain time is current time case isItTime(Minutes.SIXTY_MINUTES)', () => {
      jest.spyOn(DateTimeUtils, 'currentMinute').mockReturnValueOnce(0);
      const res = service.isItTime(Minutes.SIXTY_MINUTES);
      expect(res.isItTime).toBeTruthy();
    });

    it('should return false when remain time is less FIVE_MINUTES case isItTime(Minutes.SIXTY_MINUTES)', () => {
      jest.spyOn(DateTimeUtils, 'currentMinute').mockReturnValueOnce(5);
      const res = service.isItTime(Minutes.SIXTY_MINUTES);
      expect(res.isItTime).toBeFalsy();
    });
  });

  describe('sendMessage()', () => {
    it('should return null when isItTime = false and bossname null', async () => {
      jest.spyOn(service, 'sendMessageToDiscordId');
      const res = await service.sendMessage(false, null, 'suffix');
      expect(res).toBeNull();
    });
    it('should return null when isItTime = false and bossname not null', async () => {
      jest.spyOn(service, 'sendMessageToDiscordId');
      const res = await service.sendMessage(false, `bossname`, 'suffix');
      expect(res).toBeNull();
    });
    it('should return null when isItTime = true and bossname null', async () => {
      jest.spyOn(service, 'sendMessageToDiscordId');
      const res = await service.sendMessage(true, null, 'suffix');
      expect(res).toBeNull();
    });
  });
});
