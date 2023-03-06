export const round = (n: number, places = 2): number =>
  Math.round((n + Number.EPSILON) * 10 ** places) / 10 ** places;

export const pounds = (str: string): number => parseFloat(str.replace("£", ""));
