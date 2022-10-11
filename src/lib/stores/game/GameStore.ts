import type { Enemy } from "../../../models/Enemy";
import type { EnemyMetadata } from "src/models/meta/EnemyMetadata";
import type { GameEvent } from "../../../models/GameEvent";
import { get, writable } from "svelte/store";
import { goto } from "$app/navigation";
import { GameStates } from "$lib/data/game/GameStates";
import { Temperatures } from "$lib/data/world/Temperatures";
import {
  appendCombatEnterPhrase,
  clearCombatLines,
  pauseCombat,
  resumeCombat,
  setCurrentEnemy,
  setEnemyAnimation,
  setEnemyCooldown
} from "../combat/CombatStore";
import { affectPlayerTemperature } from "../player/PlayerStore";
import { fluxTemperature } from "$lib/utils/world/WorldUtils";
import { getLocaleTemperature } from "$lib/utils/selectors/WorldSelectors";
import {
  genGameEvent,
  getCancelledEventIndices
} from "$lib/utils/GameEventUtils";
import { getPlayerHpStatusPhrase } from "$lib/utils/CombatUtils";
import { resolvePossibleOptionArray } from "$lib/utils/MathUtils";
import { getEnemyMetadata } from "$lib/utils/selectors/EnemySelectors";

export const consoleText = writable<string[]>([]);
export const environmentTemperature = writable<number>(Temperatures.Warm);
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

export const endCombat = (enemy: Enemy): void => {
  const currentTick: number = get(tick);
  clearCombatLines();
  const enemyMeta: EnemyMetadata = getEnemyMetadata(enemy.name);
  setTimeout(() => {
    registerGameEvents([
      genGameEvent(currentTick + 1, () => pauseCombat()),
      genGameEvent(currentTick + 1, () => setEnemyAnimation("death")),
      genGameEvent(currentTick + 1, () => setEnemyCooldown(0)),
      genGameEvent(currentTick + 5, () => gameState.set(GameStates.Explore)),
      genGameEvent(currentTick + 5, () =>
        appendLine(resolvePossibleOptionArray(enemyMeta.deathPhrase))
      ),
      genGameEvent(currentTick + 8, () => appendLine(getPlayerHpStatusPhrase()))
    ]);
  }, 1000);
  setTimeout(() => goto("/game/survive/console"), 2500);
};

export const executeGameEvents = (
  currentEvents: GameEvent[],
  currentTick: number
): void => {
  let executedIndices: number[] = [];
  currentEvents.forEach((gameEvent: GameEvent, i: number) => {
    if (gameEvent.triggerTick <= currentTick) {
      gameEvent.action();
      executedIndices.push(i);
      if (gameEvent.eventFlags && gameEvent.eventFlags.length > 0) {
        executedIndices = executedIndices.concat(
          getCancelledEventIndices(currentEvents, gameEvent.eventFlags)
        );
      }
    }
  });
  const activatedEvents = currentEvents.filter(
    (gameEvent: GameEvent, i: number) => executedIndices.indexOf(i) < 0
  );
  gameEvents.set(activatedEvents);
};

export const pauseGame = (): void => paused.set(true);

export const removeExcessLines = (limit: number): void => {
  const currentLines = get(consoleText);
  if (currentLines.length <= limit) return;
  consoleText.update((lines: string[]) => lines.slice(limit, lines.length));
};

export const resumeGame = (): void => paused.set(false);

export const startCombat = (currentEnemy: Enemy): void => {
  gameState.set(GameStates.Combat);
  setCurrentEnemy(currentEnemy);
  resumeCombat();
  const enterPhrase: string = appendCombatEnterPhrase(currentEnemy);
  appendLine(enterPhrase);
  goto("/game/combat/fight");
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
