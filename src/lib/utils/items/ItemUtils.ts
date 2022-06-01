import { createItem } from "$lib/data/world/WorldFactory";
import type { Item } from "../../../models/Item";
import type { Loot } from "../../../models/Loot";

export const rollLoot = (loot: Loot[]): Item[] => {
	const result: Item[] = [];
	loot.forEach((goodie: Loot) => {
		if (goodie.probability === 1) {
			let itemCt: number = 1;
			if (Array.isArray(goodie.amount)) {
				itemCt = goodie.amount[Math.floor(Math.random() * goodie.amount.length)];
			}
			result.push(createItem(goodie.name, itemCt));
		}
		const roll = Math.random();
		if (roll < goodie.probability) return;

	});
	return result;
};