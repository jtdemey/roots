import type { Move } from "../Move";

export interface EnemyMetadata {
  baseAttack: number;
  baseDefense: number;
	display: string;
  maxHealth: number | number[];
  moves: Move[];
}
