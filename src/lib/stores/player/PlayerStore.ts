import type { Item } from "../../../models/Item";
import { get, writable } from "svelte/store";
import { createItem } from "$lib/data/world/WorldFactory";
import { getLocale } from "$lib/utils/selectors/WorldSelectors";

export const energy = writable<number>(100);
export const health = writable<number>(100);
export const items = writable<Item[]>([createItem("handwarmers", 2)]);
export const locale = writable<string>("car");
export const lastLocale = writable<string>(undefined);
export const maxHealth = writable<number>(100);
export const region = writable<string>("forest");
export const sanity = writable<number>(100);
export const temperature = writable<number>(100);

export const pickUpItem = (
  entityId: string,
  localeName: string
): void => {
  const currentLocale = getLocale(localeName);
  const localeItems: Item[] = get(currentLocale.items);
  localeItems.forEach((item: Item) => {
    if (item.entityId === entityId) {
      currentLocale.items.update((stuff: Item[]) =>
        stuff.filter((i: Item) => i.entityId !== entityId)
      );
    }
  });
};