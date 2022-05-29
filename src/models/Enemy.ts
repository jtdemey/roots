import type { EnemyMetadata } from "./meta/EnemyMetadata";
import type { Move } from "./Move";

export interface Enemy {
	cooldown: number;
	defense: number;
	entityId: string;
	health: number | number[];
	maxHealth: number;
	meta: EnemyMetadata;
	moves: Move[];
	name: string;
}