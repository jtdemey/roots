import type { Writable } from "svelte/store";

export interface Enemy {
	cooldown: Writable<number>;
	attack: Writable<number>;
	defense: Writable<number>;
	entityId: string;
	health: Writable<number>;
	maxHealth: Writable<number>;
	name: string;
}
