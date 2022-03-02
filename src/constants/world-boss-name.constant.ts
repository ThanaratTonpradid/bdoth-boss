export enum BossName {
  GARMOTH = 'กามอส',
  KARANDA = 'คารันด้า',
  KUTUM = 'คูทุม',
  KZARKA = 'คจาคาร์',
  NOUVER = 'นูเวอร์',
  OFFIN = 'โอฟิน',
  QUINTANDMURAKA = 'กวินท์ มูลลัคคา',
  VELL = 'เบลล์',
}

export const bossSuffix = ['จะปรากฏตัวอีก 30 นาที', 'จะปรากฏตัวอีก 15 นาที', 'จะปรากฏตัวอีก 5 นาที', 'ปรากฏตัวแล้ว'];
export const bossHour = [1, 10, 14, 15, 19, 23];
export const bossTime = ['00:30', '10:00', '14:00', '15:00', '19:00', '23:00'];
export const bossByDay = {
  '0-00:30': [BossName.KZARKA],
  '0-10:00': [BossName.NOUVER, BossName.KARANDA],
  '0-14:00': [BossName.KUTUM, BossName.KARANDA],
  '0-15:00': [BossName.VELL],
  '0-19:00': [BossName.KZARKA, BossName.KARANDA],
  '0-23:00': [BossName.KUTUM, BossName.NOUVER],

  '1-00:30': [BossName.KUTUM],
  '1-10:00': [BossName.KZARKA, BossName.NOUVER],
  '1-14:00': [BossName.KUTUM, BossName.NOUVER],
  '1-15:00': null,
  '1-19:00': [BossName.KZARKA, BossName.KARANDA],
  '1-23:00': [BossName.OFFIN],

  '2-00:30': [BossName.NOUVER],
  '2-10:00': [BossName.KUTUM, BossName.KARANDA],
  '2-14:00': [BossName.KUTUM, BossName.KZARKA],
  '2-15:00': null,
  '2-19:00': [BossName.QUINTANDMURAKA],
  '2-23:00': [BossName.GARMOTH],

  '3-00:30': [BossName.KZARKA, BossName.OFFIN],
  '3-10:00': [BossName.KUTUM, BossName.NOUVER],
  '3-14:00': [BossName.KARANDA, BossName.KZARKA],
  '3-15:00': null,
  '3-19:00': [BossName.KUTUM, BossName.NOUVER],
  '3-23:00': [BossName.VELL],

  '4-00:30': [BossName.KUTUM],
  '4-10:00': [BossName.KARANDA, BossName.KZARKA],
  '4-14:00': [BossName.KUTUM, BossName.NOUVER],
  '4-15:00': null,
  '4-19:00': [BossName.NOUVER, BossName.KARANDA],
  '4-23:00': [BossName.GARMOTH],

  '5-00:30': [BossName.NOUVER],
  '5-10:00': [BossName.KUTUM, BossName.KZARKA],
  '5-14:00': [BossName.KARANDA, BossName.KZARKA],
  '5-15:00': null,
  '5-19:00': [BossName.KUTUM, BossName.NOUVER],
  '5-23:00': [BossName.OFFIN],

  '6-00:30': [BossName.KARANDA],
  '6-10:00': [BossName.KUTUM, BossName.KZARKA],
  '6-14:00': [BossName.KARANDA, BossName.NOUVER],
  '6-15:00': [BossName.GARMOTH],
  '6-19:00': [BossName.QUINTANDMURAKA],
  '6-23:00': null,
};
