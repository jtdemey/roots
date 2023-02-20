import type { GameEvent } from "../../../models/GameEvent";
import type { Item } from "../../../models/Item";
import { get } from "svelte/store";
import { GameEventFlags } from "$lib/data/game/GameEventFlags";
import { ItemFlags } from "$lib/data/items/ItemFlags";
import { PlayerFlags } from "$lib/data/player/PlayerFlags";
import { items } from "$lib/stores/player/PlayerStore";
import { disableForFlags, queueEventNow } from "$lib/utils/GameEventUtils";
import { removeWords } from "$lib/utils/ParserUtils";
import { appendRandomLine } from "$lib/stores/game/GameStore";

/**
 * Syntaxes
 *
 * use [item]
 * use [item] on [target]
 * use [item] to [action]
 */

const useItem = (item: Item): void => {
  const hasFlag = (flag: ItemFlags): boolean => item.flags.some((f: ItemFlags) => f === flag);
  // TODO
  if (item.flags.some((flag: ItemFlags) => flag === ItemFlags.Equipable)) {
    // Equip item
    return;
  }
  if (item.flags.some((flag: ItemFlags) => flag === ItemFlags.Consumable)) {
    // Consume item
    return;
  }
};

export const parseUse = (input: string[], currentTick: number): GameEvent[] => {
  const queuedEvents: GameEvent[] = [];

  const allowed: boolean = disableForFlags(
    [PlayerFlags.Exiting, PlayerFlags.Running],
    queuedEvents,
    currentTick
  );
  if (!allowed) return queuedEvents;

  if (input.length === 1) {
    queueEventNow(
      queuedEvents,
      currentTick,
      () =>
        appendRandomLine([
          "What would you like to use?",
          "Use what?",
          "Specify what you would like to use."
        ]),
      [GameEventFlags.Exit]);
  }

  const purgedInput: string[] = removeWords(input, ["on", "to"]);
  const target: string = purgedInput[1];

  //Inventory
  const inventory: Item[] = get(items);
  const inventoryMatch: Item = inventory.find((item: Item) => item.name === target);
  if (inventoryMatch !== undefined) {
    
  }

  return queuedEvents;
};
