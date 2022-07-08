import type { EnemyMetadata } from "../../../models/meta/EnemyMetadata";
import type { Move } from "../../../models/Move";

interface IEnemyData {
  [key: string]: EnemyMetadata;
}

const createEnemyMetadata = (
  display: string,
  baseAttack: number,
  baseDefense: number,
  maxHealth: number | number[],
  combatEnterPhrase: string | string[],
  moves: Move[] = []
): EnemyMetadata => ({
  baseAttack,
  baseDefense,
  display,
  maxHealth,
  combatEnterPhrase,
  moves
});

export const EnemyData: IEnemyData = {
  default_enemy: createEnemyMetadata("Figure", 10, 10, 10, `A figure emerges.`),
  wolf: createEnemyMetadata("Wolf", 10, 10, 10, [
    `The wolf ducks its body defensively, furling its salivating lips.`,
    `The wolf approaches, snarling.`,
    `The wolf growls aggressively.`
  ])
};
