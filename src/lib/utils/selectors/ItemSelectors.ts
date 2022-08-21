import { ItemData } from "$lib/data/items/ItemData";
import type { ItemFlags } from "$lib/data/items/ItemFlags";
import type { Item } from "src/models/Item";
import type { ItemMetadata } from "../../../models/meta/ItemMetadata";

const getDefaultMetadata = () => ItemData[0];

export const getItemFlags = (
  name: string,
  item: Item | undefined = undefined
): ItemFlags[] => {
  const meta = getItemMetadata(name);
  return item === undefined
    ? meta.baseFlags
    : meta.baseFlags.concat(item.flags);
};

export const getItemMetadata = (name: string): ItemMetadata => {
  const metadata = ItemData[name];
  if (!metadata) {
    console.error(`getItemMetadata: no item ${name}`);
    return getDefaultMetadata();
  }
  return metadata;
};
