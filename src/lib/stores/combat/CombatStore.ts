import type { Enemy } from "../../../models/Enemy";
import type { EnemyMetadata } from "../../../models/EnemyMetadata";
import { writable } from "svelte/store";
import { getRandomElement } from "$lib/utils/MathUtils";
import { getEnemyMetadata } from "$lib/utils/selectors/EnemySelectors";

export const combatText = writable<string[]>([]);

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
export const appendCombatLine = (text: string): void =>
  combatText.update((lines: string[]) => {
    if (lines.length > 10) {
      return lines.slice(1).concat([text]);
    }
    return lines.concat([text]);
  });
