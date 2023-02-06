import { get } from "svelte/store";
import { items } from "$lib/stores/player/PlayerStore";

export const parseUse = (input: string[], currentTick: number): GameEvent[] => {
  const queuedEvents: GameEvent[] = [];

  const allowed = disableForFlags(
    [PlayerFlags.Exiting, PlayerFlags.Running],
    queuedEvents,
    currentTick
  );
  if (!allowed) return queuedEvents;

  // const purgedInput: string[] = removeWords(

  //Inventory
  const inventory = get(items);
  

  return queuedEvents;
};
