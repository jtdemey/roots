import type { GameEvent } from "../../../models/GameEvent";
import { appendLine } from "$lib/stores/game/GameStore";
import { genGameEvent } from "../ExploreParser";

export const parseGo = (input: string[], currentTick: number): GameEvent[] => {
  const queuedEvents: GameEvent[] = [];
  if (!Array.isArray(input)) {
    queuedEvents.push(genGameEvent(currentTick, () => appendLine("aosdifj")));
  }
  return queuedEvents;
};