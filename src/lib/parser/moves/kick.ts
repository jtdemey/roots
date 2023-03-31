import type { Enemy } from "../../../models/Enemy";
import type { Move } from "../../../models/Move";
import { getCombatMoveData } from "$lib/utils/selectors/MoveSelectors";
import { queueEventNow } from "$lib/utils/GameEventUtils";

export const parseKick = (
  input: string[],
  currentTick: number,
  enemy: Enemy
): GameEvent[] => {
  const queuedEvents: GameEvent[] = [];
  const moveData: Move = getCombatMoveData();

  if (input.length === 1) {
    queueEventNow(queuedEvents, currentTick, () => {});
  }

  return queuedEvents;
};
