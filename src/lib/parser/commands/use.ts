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
import { GameColors } from "$lib/data/ui/GameColors";

/**
 * Syntaxes
 *
 * use [item]
 * use [item] on [target]
 * use [item] to [action]
 */

const useItem = (item: Item): void => {
  const hasFlag = (flag: ItemFlags): boolean =>
    item.flags.some((f: ItemFlags) => f === flag);
  // TODO
  if (hasFlag(ItemFlags.Usable)) {
    // Equip item
    return;
  }
  if (hasFlag(ItemFlags.Equipable)) {
    // Equip item
    return;
  }
  if (hasFlag(ItemFlags.Consumable)) {
    // Consume item
    return;
  }
};

export const parseUse = (input: string[], currentTick: number): GameEvent[] => {
  const queuedEvents: GameEvent[] = [];

  if (input.length === 1) {
    queueEventNow(
      queuedEvents,
      currentTick,
      () =>
        appendRandomLine(
          [
            "What would you like to use?",
            "Use what?",
            "Specify what you would like to use."
          ],
          GameColors.console.system
        ),
      [GameEventFlags.Exit]
    );
  }

  const purgedInput: string[] = removeWords(input, ["on", "to"]);
  const target: string = purgedInput[1];

  // Inventory
  const inventory: Item[] = get(items);
  const inventoryMatch: Item | undefined = inventory.find(
    (item: Item) => item.name === target
  );
  if (inventoryMatch !== undefined) {
    useItem(inventoryMatch);
    return queuedEvents;
  }

  // Locale

  return queuedEvents;
};
