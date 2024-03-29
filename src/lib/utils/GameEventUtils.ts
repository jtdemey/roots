import type { GameEvent } from "../../models/GameEvent";
import type { GameEventFlags } from "$lib/data/game/GameEventFlags";
import type { PlayerFlags } from "$lib/data/player/PlayerFlags";
import { get } from "svelte/store";
import { appendLine } from "$lib/stores/game/GameStore";
import { playerFlags } from "$lib/stores/player/PlayerStore";

export const disableForFlags = (
  flags: PlayerFlags[],
  queuedEvents: GameEvent[],
  currentTick: number,
  feedback: string = "You can't do that now."
): boolean => {
  const currentFlags: PlayerFlags[] = get(playerFlags);
  let enabled: boolean = true;
  currentFlags.forEach((flag: PlayerFlags) => {
    if (enabled === false) return;
    if (flags.some((f: PlayerFlags) => f === flag)) {
      enabled = false;
      queueEventNow(queuedEvents, currentTick, () => appendLine(feedback));
    }
  });
  return enabled;
};

export const genGameEvent = (
  triggerTick: number,
  action: Function,
  eventFlags?: number[],
  cancelFlags?: number[],
  eventName?: string
) => ({
  triggerTick,
  action,
  eventFlags,
  cancelFlags,
  eventName
});

export const getCancelledEventIndices = (
  queuedEvents: GameEvent[],
  flagsToCancel: GameEventFlags[]
): number[] => {
  const result: number[] = [];
  queuedEvents.forEach((queuedEvent: GameEvent, i: number) => {
    if (
      queuedEvent.cancelFlags &&
      queuedEvent.cancelFlags.length > 0 &&
      queuedEvent.cancelFlags.some((cancelFlag: GameEventFlags) =>
        flagsToCancel.some(
          (flagToCancel: GameEventFlags) => flagToCancel === cancelFlag
        )
      )
    ) {
      result.push(i);
    }
  });
  return result;
};

export const executePromisesSequentially = (
  promiseFunctions: Function[]
): void => {
  promiseFunctions
    .reduce((prevVal: any, currentVal: Function) => {
      return prevVal.then((promiseValue: any) => {
        return currentVal(promiseValue);
      });
    }, Promise.resolve())
    .catch((err: any) => console.error(err));
};

export const queueEventNow = (
  eventCollection: GameEvent[],
  currentTick: number,
  action: Function,
  eventFlags?: GameEventFlags[],
  cancelFlags?: GameEventFlags[],
  eventName?: string
): void => {
  eventCollection.push(
    genGameEvent(currentTick, action, eventFlags, cancelFlags, eventName)
  );
};
