import type { EnemyMetadata } from "../../../models/meta/EnemyMetadata";
import type { Move } from "../../../models/Move";

interface IEnemyData {
  [key: string]: EnemyMetadata;
}

const createEnemyMetadata = (
  display: string,
  baseAttack: number,
  baseDefense: number,
  baseEvasion: number,
  baseSpeed: number,
  maxHealth: number | number[],
  combatEnterPhrase: string | string[],
  moves: Move[] = []
): EnemyMetadata => ({
  baseAttack,
  baseDefense,
  baseEvasion,
  baseSpeed,
  display,
  maxHealth,
  combatEnterPhrase,
  moves
});

export const EnemyData: IEnemyData = {
  default_enemy: createEnemyMetadata(
    "Figure",
    50,
    50,
    50,
    50,
    80,
    `A figure emerges.`
  ),
  wolf: createEnemyMetadata(
    "Wolf",
    60,
    25,
    40,
    65,
    [28, 30],
    [
      `The wolf ducks its body defensively, furling its salivating lips.`,
      `A wolf approaches, snarling.`,
      `The wolf growls aggressively.`
    ]
  )
};
