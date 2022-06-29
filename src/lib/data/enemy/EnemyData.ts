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
  moves: Move[] = []
): EnemyMetadata => ({
  baseAttack,
  baseDefense,
  display,
  maxHealth,
  moves
});

export const EnemyData: IEnemyData = {
  default_enemy: createEnemyMetadata("Figure", 10, 10, 10),
  wolf: createEnemyMetadata("Wolf", 10, 10, 10)
};
