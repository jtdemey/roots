import type { Exit } from "../../../models/Exit";
import { PlayerTemperatures } from "$lib/data/player/PlayerTemperatures";
import { GameColors } from "$lib/data/ui/GameColors";
import { Temperatures } from "$lib/data/world/Temperatures";

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

export const getGameMapFill = (
  isHazardous: boolean,
  visits: number
): string => {
  if (isHazardous === true) {
    return GameColors.gameMap.hazardous;
  }
  if (visits > 0) {
    return GameColors.gameMap.inProgress;
  }
  return GameColors.gameMap.unvisited;
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

export const getTemperatureLevel = (fahrenheit: number): string => {
  let tempLvl: string = "Glacial";
  Object.keys(Temperatures).forEach((temperatureLvl: string) => {
    if (fahrenheit >= Temperatures[temperatureLvl]) {
      tempLvl = temperatureLvl;
    }
  });
  return tempLvl;
};

export const getVisibleExits = (exits: Exit[], visibility: number): Exit[] =>
  exits.filter((exit: Exit) => exit.visibilityThreshold >= visibility);

export const toFahrenheit = (celsius: number): number => celsius * 1.8 + 32;

export const toCelsius = (fahrenheit: number): number =>
  (fahrenheit - 32) / 1.8;
