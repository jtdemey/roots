import type { GameEvent } from "../../../models/GameEvent";
import { GameStates } from "$lib/data/game/GameStates";
import { writable } from "svelte/store";

export const consoleText = writable<string[]>([]);
export const gameEvents = writable<GameEvent[]>([]);
export const gameState = writable<GameStates>(GameStates.MainMenu);
export const paused = writable<boolean>(true);
export const tick = writable<number>(0);

export const appendLine = (text: string) =>
  consoleText.update((lines: string[]) => lines.concat([text]));

export const executeGameEvents = (
  currentEvents: GameEvent[],
  currentTick: number
) => {
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

export const registerGameEvent = (gameEvent: GameEvent) =>
  gameEvents.update((events: GameEvent[]) => events.concat([gameEvent]));

export const registerGameEvents = (addedEvents: GameEvent[]) =>
	gameEvents.update((events: GameEvent[]) => events.concat(addedEvents));