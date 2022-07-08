import type { Move } from "../Move";

export interface EnemyMetadata {
  baseAttack: number;
  baseDefense: number;
  combatEnterPhrase: string | string[];
	display: string;
  maxHealth: number | number[];
  moves: Move[];
}
