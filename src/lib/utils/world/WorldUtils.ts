export const fluxTemperature = (currentFlux: number, fluctuation: number = 4): number => {
  const fluxChance = Math.random();
  if (fluxChance < 0.5) return currentFlux;
	const min = -(fluctuation);
	const max = fluctuation;
  if (currentFlux < min) return min;
  if (currentFlux > max) return max;
  if (currentFlux >= min && currentFlux <= max) {
    const fluxAmt = fluxChance < 0.75 ? 1 : -1;
    return currentFlux + fluxAmt;
  }
  return currentFlux;
};

export const toFahrenheit = (celsius: number): number => celsius * 1.8 + 32;

export const toCelsius = (fahrenheit: number): number =>
  (fahrenheit - 32) / 1.8;