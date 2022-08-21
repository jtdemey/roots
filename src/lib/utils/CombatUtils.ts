import type { Enemy } from "../../models/Enemy";
import type { Move } from "../../models/Move";
import { getEnemyMetadata } from "./selectors/EnemySelectors";
import { between } from "./MathUtils";

export const getNextMove = (enemy: Enemy): Move => {
  const moves: Move[] = getEnemyMetadata(enemy.name).moves;
  let probabilityIndex: number = 0;
  const probabilityRanges: number[][] = moves.map((move: Move) => {
    const increment: number = move.probability * 100;
    const range: number[] = [probabilityIndex, probabilityIndex + increment];
    probabilityIndex += increment;
    return range;
  });
  const roll: number = between(0, probabilityIndex);
  let selectedMove: Move = moves[0];
  moves.forEach((move: Move, i: number) => {
    if (roll >= probabilityRanges[i][0] && roll <= probabilityRanges[i][1]) {
      selectedMove = move;
    }
  });
  return selectedMove;
};

export const performMove = (enemy: Enemy, move: Move): void => {
  if (move.instantEffects.length < 1) return;
  move.instantEffects.forEach((effect: Function) => {
    
  });
};
