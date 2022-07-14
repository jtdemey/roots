import type { Enemy } from "../../../models/Enemy";
import type { EnemyMetadata } from "../../../models/EnemyMetadata";
import { writable } from "svelte/store";
import { getRandomElement } from "$lib/utils/MathUtils";
import { getEnemyMetadata } from "$lib/utils/selectors/EnemySelectors";

export const combatText = writable<string[]>([]);
export const currentEnemy = writable<Enemy>(undefined);

export const appendCombatEnterPhrase = (enemy: Enemy): void => {
  const meta: EnemyMetadata = getEnemyMetadata(enemy.name);
  const startPhrase: string | string[] = meta.combatEnterPhrase;
  if (Array.isArray(startPhrase)) {
    appendCombatLine(getRandomElement(startPhrase));
    return;
  }
  appendCombatLine(startPhrase);
};

//To-do: figure out fading out/continuous scrolling
/*
 *  Options:
 *  -Timeout event for each line to destroy it after x ticks
 *  -
 *
 *
 */
export const appendCombatLine = (text: string): void =>
  combatText.update((lines: string[]) => {
    if (lines.length > 15) {
      setTimeout(() => popCombatLines(5), 500);
    }
    return lines.concat([text]);
  });

export const hurtEnemy = (damage: number): void => {
  currentEnemy.update((enemy: Enemy) =>
    Object.assign({}, { ...enemy, health: enemy.health - damage })
  );
};

export const popCombatLines = (lineCount: number): void =>
  combatText.update((lines: string[]) => lines.slice(lineCount));

export const setCurrentEnemy = (enemy: Enemy): void => currentEnemy.set(enemy);
