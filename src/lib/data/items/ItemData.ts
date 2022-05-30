import type { ItemMetadata } from "../../../models/meta/ItemMetadata";
import { createItemMetadata } from "../world/WorldFactory";

interface IItemData {
  [key: string]: ItemMetadata;
}

export const ItemData: IItemData = {
  handwarmers: createItemMetadata("Handwarmers", "these are handwarmers.", true),
  flashlight: createItemMetadata("Flashlight", "fadisofjos.", false)
};