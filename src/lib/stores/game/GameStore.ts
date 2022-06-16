import type { GameEvent } from "../../../models/GameEvent";
import { GameStates } from "$lib/data/game/GameStates";
import { get, writable } from "svelte/store";
import { fluxTemperature } from "$lib/utils/world/WorldUtils";
import { getLocaleTemperature } from "$lib/utils/selectors/WorldSelectors";
import { affectPlayerTemperature } from "../player/PlayerStore";
import { Temperatures } from "$lib/data/world/Temperatures";

export const consoleText = writable<string[]>([]);
export const environmentTemperature = writable<number>(Temperatures.Normal);
export const gameEvents = writable<GameEvent[]>([]);
export const gameState = writable<GameStates>(GameStates.MainMenu);
export const paused = writable<boolean>(true);
export const temperatureFlux = writable<number>(0);
export const tick = writable<number>(0);

export const appendLine = (text: string): void =>
  consoleText.update((lines: string[]) => lines.concat([text]));

export const appendRandomLine = (texts: string[]): void => {
	const selectedTextIndex = Math.floor(Math.random() * texts.length);
	appendLine(texts[selectedTextIndex] || "");
};

export const executeGameEvents = (
  currentEvents: GameEvent[],
  currentTick: number
): void => {
  const executedIndices: number[] = [];
  currentEvents.forEach((event: GameEvent, i: number) => {
    if (event.triggerTick <= currentTick) {
      event.action();
      executedIndices.push(i);
    }
  });
  const activatedEvents = currentEvents.filter(
    (gameEvent: GameEvent, i: number) => executedIndices.indexOf(i) < 0
  );
  gameEvents.set(activatedEvents);
};

export const temperatureTick = (
  currentFlux: number,
  environmentTemp: number,
  playerLocale: string,
	playerTemp: number
): void => {
  const flux = fluxTemperature(currentFlux);
  if (flux !== currentFlux) {
    temperatureFlux.set(flux);
  }
  const localeTemperature = get(getLocaleTemperature(playerLocale));
  const nextEnvironmentTemp = Math.round(
    (localeTemperature + environmentTemp) / 2 + flux
  );
  environmentTemperature.set(nextEnvironmentTemp);
  affectPlayerTemperature(nextEnvironmentTemp, playerTemp);
};

export const registerGameEvent = (gameEvent: GameEvent): void =>
  gameEvents.update((events: GameEvent[]) => events.concat([gameEvent]));

export const registerGameEvents = (addedEvents: GameEvent[]): void =>
  gameEvents.update((events: GameEvent[]) => events.concat(addedEvents));