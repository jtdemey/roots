import type { ItemFlags } from "$lib/data/items/ItemFlags";

export interface Item {
  amount: number;
  entityId: string;
  flags: ItemFlags[];
  name: string;
  containerId?: string | null;
}
