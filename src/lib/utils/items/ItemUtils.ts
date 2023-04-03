import type { Item } from "../../../models/Item";
import type { ItemBtn } from "../../../models/ui/ItemBtn";
import type { ItemFlags } from "$lib/data/items/ItemFlags";
import type { Loot } from "../../../models/Loot";
import { createItem } from "$lib/data/world/WorldFactory";
import { getItemFlags, getItemMetadata } from "../selectors/ItemSelectors";

export const genItemBtn = (
  color: string,
  text: string,
  action: Function
): ItemBtn => ({
  color,
  text,
  action
});

export const getItemDisplayName = (item: Item): string => {
  const displayName = getItemMetadata(item.name).display;
  if (item.amount > 1) {
    return `${displayName} (${item.amount})`;
  }
  return displayName;
};

export const itemHasFlag = (item: Item, flag: ItemFlags): boolean =>
  getItemFlags(item.name, item).indexOf(flag) > -1;

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
