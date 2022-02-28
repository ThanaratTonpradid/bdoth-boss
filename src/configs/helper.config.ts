import { lowerCase, trim } from 'lodash';

export function isEnabled(env: string): boolean {
  const value = ['1', 'true', 'yes', 'on'];
  return value.includes(lowerCase(trim(env)));
}

export function isProduction(nodeEnv: string): boolean {
  return lowerCase(nodeEnv) === 'production';
}
