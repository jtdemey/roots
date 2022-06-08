import type { Item } from "../../../models/Item";
import type { Loot } from "../../../models/Loot";
import { createItem } from "$lib/data/world/WorldFactory";
import { getItemMetadata } from "../selectors/ItemSelectors";

export const copyItem = (item: Item) => false;

export const getItemDisplayName = (item: Item): string => {
  const displayName = getItemMetadata(item.name).display;
  if (item.amount > 1) {
    return `${displayName} (${item.amount})`;
  }
  return displayName;
};

export const makeItemBtnAction =
  (cb: Function, setSelectedItemId: Function): Function =>
  () => {
    setSelectedItemId("");
    cb();
  };

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