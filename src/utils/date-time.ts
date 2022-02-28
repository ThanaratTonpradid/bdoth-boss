import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export class DateTimeUtils {
  static getDayjs(date = new Date()): dayjs.Dayjs {
    return dayjs(date).tz('Asia/Bangkok');
  }

  static currentDay(): string {
    return dayjs().tz('Asia/Bangkok').day().toString();
  }

  static currentHour(): number {
    return dayjs().tz('Asia/Bangkok').hour();
  }

  static currentMinute(): number {
    return dayjs().tz('Asia/Bangkok').minute();
  }
}
