import type { ItemMetadata } from "../../../models/meta/ItemMetadata";
import { createItemMetadata } from "../world/WorldFactory";

interface IItemData {
  [key: string]: ItemMetadata;
}

export const ItemData: IItemData = {
  //Consumables
  handwarmers: createItemMetadata(
    "Handwarmers",
    "These are small packets that disperse a modest amount of heat when activated.",
    true
  ),

  //Tools
  flashlight: createItemMetadata(
    "Flashlight",
    "It looks like a meager black torch powered by batteries.",
    false
  ),

  //Weapons
  crowbar: createItemMetadata(
    "Crowbar",
    "This is a metal tool that can be used for many purposes, some more blunt than others.",
    false,
    true
  ),

  //Writing
  welcome_note: createItemMetadata(
    "Note",
    "It seems to be a dingy, water-damaged slip of paper with a note scribbled upon it.",
    false
  )
};
