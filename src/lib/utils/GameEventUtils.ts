import { genGameEvent } from "$lib/parser/ExploreParser";
import type { GameEvent } from "src/models/GameEvent";

export const queueEventNow = (
  eventCollection: GameEvent[],
  currentTick: number,
  action: Function
): void => {
  eventCollection.push(genGameEvent(currentTick, action));
};