import type { GameEvent } from "../../models/GameEvent";
import type { PlayerFlags } from "$lib/data/player/PlayerFlags";
import { get } from "svelte/store";
import { appendLine } from "$lib/stores/game/GameStore";
import { playerFlags } from "$lib/stores/player/PlayerStore";
import { genGameEvent } from "$lib/parser/ExploreParser";

export const disableForFlags = (
  flags: PlayerFlags[],
  queuedEvents: GameEvent[],
  currentTick: number
): boolean => {
  const currentFlags: PlayerFlags[] = get(playerFlags);
  let enabled: boolean = true;
  currentFlags.forEach((flag: PlayerFlags) => {
    if (enabled === false) return;
    if (flags.some((f: PlayerFlags) => f === flag)) {
      enabled = false;
      queueEventNow(queuedEvents, currentTick, () =>
        appendLine("You can't do that now.")
      );
    }
  });
  return enabled;
};

export const queueEventNow = (
  eventCollection: GameEvent[],
  currentTick: number,
  action: Function
): void => {
  eventCollection.push(genGameEvent(currentTick, action));
};
