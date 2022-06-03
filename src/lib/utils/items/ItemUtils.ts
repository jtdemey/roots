import { createItem } from "$lib/data/world/WorldFactory";
import type { Item } from "../../../models/Item";
import type { Loot } from "../../../models/Loot";

const resolveItemAmount = (amount: number | number[]): number =>
  Array.isArray(amount)
    ? amount[Math.floor(Math.random() * amount.length)]
    : amount;

export const rollLoot = (containerId: string, loot: Loot[]): Item[] => {
  const result: Item[] = [];
  loot.forEach((goodie: Loot) => {
    if (goodie.probability === 1) {
      result.push(
        createItem(goodie.name, resolveItemAmount(goodie.amount), containerId)
      );
    }
    const roll = Math.random();
    if (roll < goodie.probability) return;
    result.push(
      createItem(goodie.name, resolveItemAmount(goodie.amount), containerId)
    );
  });
  return result;
};