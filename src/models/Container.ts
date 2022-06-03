import type { Writable } from "svelte/store";
import type { Loot } from "./Loot";

export interface Container {
	containerState: number;
	description: string;
	entityId: string;
	name: string;
	locked: boolean;
	loot: Writable<Loot[]>;
}