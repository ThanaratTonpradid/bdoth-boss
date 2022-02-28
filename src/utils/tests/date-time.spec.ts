import { DateTimeUtils } from '../date-time';
import * as dayjs from 'dayjs';

describe('DateTimeUtils', () => {
  describe('getDayjs()', () => {
    it('should toString', () => {
      const res = DateTimeUtils.getDayjs(new Date('2022-02-26T21:51:28.211Z'));
      expect(res).toEqual(dayjs('2022-02-26T21:51:28.211Z').tz('Asia/Bangkok'));
    });
  });

  describe('currentDay()', () => {
    it('should toString', () => {
      const res = DateTimeUtils.currentDay();
      expect(res).toEqual(dayjs().day().toString());
    });
  });

  describe('currentHour()', () => {
    it('should toNumber', () => {
      const res = DateTimeUtils.currentHour();
      expect(res).toEqual(dayjs().hour());
    });
  });

  describe('currentMinute()', () => {
    it('should toNumber', () => {
      const res = DateTimeUtils.currentMinute();
      expect(res).toEqual(dayjs().minute());
    });
  });
});
