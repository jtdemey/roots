import type { GameEventFlags } from "$lib/data/game/GameEventFlags";

export interface GameEvent {
  action: Function;
  cancelFlags?: GameEventFlags[];
  eventFlags?: GameEventFlags[];
  eventName?: string;
  triggerTick: number;
}
