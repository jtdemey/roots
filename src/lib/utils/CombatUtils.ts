import type { Enemy } from "../../models/Enemy";
import type { Move } from "../../models/Move";
import { get } from "svelte/store";
import { health } from "$lib/stores/player/PlayerStore";
import { getEnemyMetadata } from "./selectors/EnemySelectors";
import { between } from "./MathUtils";

export const getMoveProbabilities = (moves: Move[]): number[][] => {
  let probabilityIndex: number = 0;
  return moves.map((move: Move) => {
    const increment: number = move.probability * 100;
    const range: number[] = [probabilityIndex, probabilityIndex + increment];
    probabilityIndex += increment;
    return range;
  });
};

export const getNextMove = (enemy: Enemy): Move => {
  const moves: Move[] = getEnemyMetadata(enemy.name).moves;
  const probabilityRanges: number[][] = getMoveProbabilities(moves);
  const roll: number = between(
    0,
    probabilityRanges[probabilityRanges.length - 1][1]
  );
  let selectedMove: Move = moves[0];
  moves.forEach((move: Move, i: number) => {
    if (roll >= probabilityRanges[i][0] && roll <= probabilityRanges[i][1]) {
      selectedMove = move;
    }
  });
  return selectedMove;
};

export const getPlayerHpStatusPhrase = (): string => {
  const hp: number = get(health);
  if (hp < 10) {
    return `Unbearable pain surfaces as your adrenaline wanes.`;
  }
  if (hp < 25) {
    return `You recoil in pain after noticing the extent of your wounds.`;
  }
  if (hp < 50) {
    return `You are considerably hurt.`;
  }
  if (hp < 75) {
    return `Your injuries are painful, but manageable.`;
  }
  if (hp < 90) {
    return `You feel slight pain from your injuries, thankful it's nothing serious.`;
  }
  if (hp < 100) {
    return `The still air punctuates the silence.`;
  }
  return `A relieved sigh escapes your lungs.`;
};
