import { Temperatures } from "$lib/data/world/Temperatures";
import { PlayerTemperatures } from "$lib/data/player/PlayerTemperatures";

export const fluxTemperature = (
  currentFlux: number,
  fluctuation: number = 4
): number => {
  const fluxChance = Math.random();
  if (fluxChance < 0.5) return currentFlux;
  const min = -fluctuation;
  const max = fluctuation;
  if (currentFlux < min) return min;
  if (currentFlux > max) return max;
  if (currentFlux >= min && currentFlux <= max) {
    const fluxAmt = fluxChance < 0.75 ? 1 : -1;
    return currentFlux + fluxAmt;
  }
  return currentFlux;
};

export const getTemperatureLevel = (fahrenheit: number): string => {
  let tempLvl: string = "Glacial";
  Object.keys(Temperatures).forEach((temperatureLvl: string) => {
    if (fahrenheit >= Temperatures[temperatureLvl]) {
      tempLvl = temperatureLvl;
    }
  });
  return tempLvl;
};

export const getPlayerTemperatureLevel = (fahrenheit: number): string => {
  let tempLvl: string = "Dead";
  Object.keys(PlayerTemperatures).forEach((temperatureLvl: string) => {
    if (fahrenheit >= PlayerTemperatures[temperatureLvl]) {
      tempLvl = temperatureLvl;
    }
  });
  return tempLvl;
};

export const toFahrenheit = (celsius: number): number => celsius * 1.8 + 32;

export const toCelsius = (fahrenheit: number): number =>
  (fahrenheit - 32) / 1.8;
