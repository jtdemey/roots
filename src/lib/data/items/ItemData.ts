import type { ItemMetadata } from "../../../models/meta/ItemMetadata";
import { createItemMetadata } from "../world/WorldFactory";
import { ItemFlags } from "./ItemFlags";

interface IItemData {
  [key: string]: ItemMetadata;
}

export const ItemData: IItemData = {
  //Consumables
  handwarmers: createItemMetadata(
    "Handwarmers",
    [ItemFlags.Stackable],
    "These are small packets that disperse a modest amount of heat when activated."
  ),

  //Tools
  flashlight: createItemMetadata(
    "Flashlight",
    [ItemFlags.Equipable],
    "It looks like a meager black torch powered by batteries."
  ),

  //Weapons
  crowbar: createItemMetadata(
    "Crowbar",
    [ItemFlags.Equipable],
    "This is a metal tool that can be used for many purposes, some more blunt than others."
  ),

  notebook: createItemMetadata(
    "Notebook",
    [ItemFlags.Equipable],
    "It's a small hardcover journal with a fraying spine."
  ),

  //Writing
  welcome_note: createItemMetadata(
    "Note",
    [],
    "It seems to be a dingy, water-damaged slip of paper with a note scribbled upon it."
  )
};
