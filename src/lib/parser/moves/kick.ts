import type { Enemy } from "../../../models/Enemy";
import { queueEventNow } from "$lib/utils/GameEventUtils";

export const parseKick = (
  input: string[],
  currentTick: number,
  enemy: Enemy
): GameEvent[] => {
  const queuedEvents: GameEvent[] = [];
  
  if (input.length === 1) {
    queueEventNow(queuedEvents, currentTick, () => {
      
    });
  }

  return queuedEvents;
};
