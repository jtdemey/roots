export const roundTo = (value: number, decimals: number): number =>
  Number(Math.round(parseFloat(value + "e" + decimals)) + "e-" + decimals);