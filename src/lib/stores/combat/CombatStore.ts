import type { CombatAnimation } from "../../../models/ui/CombatAnimation";
import type { Enemy } from "../../../models/Enemy";
import type { EnemyMetadata } from "../../../models/meta/EnemyMetadata";
import { get, writable, type Writable } from "svelte/store";
import { CombatAnimationData } from "$lib/data/combat/CombatAnimationData";
import { endCombat } from "../game/GameStore";
import { affectPlayerHealth } from "../player/PlayerStore";
import { getRandomElement } from "$lib/utils/MathUtils";
import { getEnemyMetadata } from "$lib/utils/selectors/EnemySelectors";

export const attack = writable<number>(80);
export const defense = writable<number>(0);
export const evasion = writable<number>(0);
export const combatText = writable<string[]>([]);
export const cooldown = writable<number>(0);
export const currentEnemy = writable<Enemy>(undefined);
export const enemyAnimation = writable<string>("");
export const enemyCooldown = writable<number>(0);
export const playerAnimation = writable<string>("");

export const affectDefense = (amount: number): void =>
  defense.update((d: number) => {
    const nextDefense: number = d + amount;
    if (nextDefense < 1) return 1;
    if (nextDefense > 100) return 100;
    return nextDefense;
  });

export const affectEvasion = (amount: number): void =>
  evasion.update((e: number) => {
    const nextEvasion: number = e + amount;
    if (nextEvasion < 1) return 1;
    if (nextEvasion > 100) return 100;
    return nextEvasion;
  });

export const appendCombatEnterPhrase = (enemy: Enemy): void => {
  const meta: EnemyMetadata = getEnemyMetadata(enemy.name);
  const startPhrase: string | string[] = meta.combatEnterPhrase;
  if (Array.isArray(startPhrase)) {
    appendCombatLine(getRandomElement(startPhrase));
    return;
  }
  appendCombatLine(startPhrase);
};

export const appendCombatLine = (
  text: string,
  enemyName: string = "figure"
): void =>
  combatText.update((lines: string[]) =>
    lines.concat([text.replace("[enemy]", enemyName)])
  );

export const clearCombatLines = (): void => combatText.set([]);

export const hurtEnemy = (damage: number): void => {
  const baddie: Enemy = get(currentEnemy); 
  const enemyHealth: Writable<number> = baddie.health;
  let shouldEndCombat: boolean = false;
  enemyHealth.update((currentHealth: number) => {
    const hp: number = currentHealth - damage;
    if (hp < 1) {
      shouldEndCombat = true;
    }
    return hp < 0 ? 0 : hp;
  });
  if (shouldEndCombat) endCombat(baddie);
};

export const hurtPlayer = (amount: number): void => {
  const damage: number = amount * (get(defense) / 100);
  affectPlayerHealth(damage);
};

export const resetEnemyAnimation = (): void => enemyAnimation.set("");

export const resetPlayerAnimation = (): void => playerAnimation.set("");

export const setCurrentEnemy = (enemy: Enemy): void => currentEnemy.set(enemy);

const validateAnimationExists = (animationName: string): void => {
  const animData: CombatAnimation = CombatAnimationData[animationName];
  if (!animData) {
    console.error(`No combat animation found for key ${animationName}`);
  }
};

export const setEnemyAnimation = (animationName: string): void => {
  validateAnimationExists(animationName);
  enemyAnimation.set(animationName);
};

export const setPlayerAnimation = (animationName: string): void => {
  validateAnimationExists(animationName);
  playerAnimation.set(animationName);
};

export const setEnemyCooldown = (cd: number): void => enemyCooldown.set(cd);

export const setPlayerCooldown = (cd: number): void => cooldown.set(cd);
