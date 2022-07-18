import type { Enemy } from "../../../models/Enemy";
import type { EnemyMetadata } from "../../../models/meta/EnemyMetadata";
import { get, writable } from "svelte/store";
import { getRandomElement } from "$lib/utils/MathUtils";
import { getEnemyMetadata } from "$lib/utils/selectors/EnemySelectors";

export const attack = writable<number>(80);
export const defense = writable<number>(20);
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

export const appendCombatLine = (text: string, enemyName: string = "figure"): void =>
  combatText.update((lines: string[]) => lines.concat([text.replace("[enemy]", enemyName)]));

export const clearCombatLines = (): void => combatText.set([]);

export const hurtEnemy = (damage: number): void => {
  get(currentEnemy).health.update(
    (currentHealth: number) => currentHealth - damage
  );
};

export const setCurrentEnemy = (enemy: Enemy): void => currentEnemy.set(enemy);
