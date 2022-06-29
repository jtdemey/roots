export const between = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const roundTo = (value: number, decimals: number): number =>
  Number(Math.round(parseFloat(value + "e" + decimals)) + "e-" + decimals);
