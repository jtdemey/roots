import type { ItemFlags } from "$lib/data/items/ItemFlags";

export interface ItemMetadata {
  baseFlags: ItemFlags[];
  display: string;
  description: string;
  interactions?: { [key: string]: Function };
}
