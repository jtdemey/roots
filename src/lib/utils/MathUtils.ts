export const between = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomElement = (arr: any[]): any =>
  arr[Math.floor(Math.random() * arr.length)];

export const roundTo = (value: number, decimals: number): number =>
  Number(Math.round(parseFloat(value + "e" + decimals)) + "e-" + decimals);
