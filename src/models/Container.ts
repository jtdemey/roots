import type { Writable } from "svelte/store";
import type { Item } from "./Item";
import type { Loot } from "./Loot";

export interface Container {
	containerState: number;
	description: string;
	entityId: string;
	name: string;
	items: Writable<Item[]>;
	locked: boolean;
	loot: Writable<Loot[]>;
}