import type { Item } from "./Item";
import type { Loot } from "./Loot";

export interface Container {
	containerState: number;
	description: string;
	entityId: string;
	name: string;
	items: Item[];
	locked: boolean;
	loot: Loot[];
}