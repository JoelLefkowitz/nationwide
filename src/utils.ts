import { sortBy } from 'lodash';

export const fromPounds = (str: string): number =>
  parseFloat(str.replace('£', ''));

export const beforeChar = (str: string, char: string): string =>
  str.includes(char) ? str.split(char)[0] : str;

export const sortFields = (obj: Record<string, number>) =>
  Object.fromEntries(
    sortBy(
      Object.entries(obj).map(([k, v]) => ({ k, value: v })),
      'value'
    ).map((i) => [i.k, i.value])
  );

export const roundAdd = (a: number, b: number): number =>
  Math.round((a + b + Number.EPSILON) * 100) / 100;
