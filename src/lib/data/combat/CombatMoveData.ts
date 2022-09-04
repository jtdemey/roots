import type { DelayedEffect, Move } from "../../../models/Move";
import {
  affectDefense,
  hurtEnemy,
  setEnemyAnimation,
  setPlayerAnimation
} from "$lib/stores/combat/CombatStore";
import { between } from "$lib/utils/MathUtils";

interface ICombatMoveData {
  [key: string]: Move;
}

const getDamageEffects = (
  min: number,
  max: number,
  enemyAnimation: string = "impact",
  playerAnimation: string = "lunge"
): Function[] => {
  return [
    () => hurtEnemy(between(min, max)),
    () => setEnemyAnimation(enemyAnimation),
    () => setPlayerAnimation(playerAnimation)
  ];
};

export const genMoveData = (
  name: string,
  accuracy: number,
  cooldown: number,
  hitPhrase: string | string[],
  missPhrase: string | string[],
  instantEffects: Function[] = [],
  delayedEffects: DelayedEffect[] = [],
  animation: string = "lunge",
  probability: number = 1.0,
  condition: Function = () => true
): Move => ({
  accuracy,
  animation,
  condition,
  cooldown,
  delayedEffects,
  hitPhrase,
  instantEffects,
  missPhrase,
  name,
  probability
});

export const CombatMoveData: ICombatMoveData = {
  block: genMoveData(
    "block",
    100,
    6,
    [
      `Your muscles contract as you guard your vitals.`,
      `You attempt to defend against oncoming blows.`,
      `You stand defensively, anticipating attacks.`
    ],
    "",
    [() => affectDefense(40)],
    [{ delay: 6, effect: () => affectDefense(-40) }]
  ),

  headbutt: genMoveData(
    "headbutt",
    30,
    6,
    [`You headbutt the [enemy].`],
    [`Your head whooshes past the [enemy].`],
    [...getDamageEffects(1, 8)],
    []
  ),

  kick: genMoveData(
    "kick",
    80,
    4,
    [
      `You land a solid kick on the [enemy].`,
      `You drive the heel of your boot into the [enemy].`
    ],
    [
      `The [enemy] shifts its mass, stifling your kick.`,
      `Your kick fails to land a solid hit.`,
      `Your kick falters and misses.`
    ],
    [...getDamageEffects(4, 27)],
    []
  ),

  punch: genMoveData(
    "punch",
    50,
    3,
    [
      `Your fist clashes against the [enemy].`,
      `You punch the [enemy].`,
      `You land a solid punch.`,
      `Your knuckles pound into the [enemy].`
    ],
    [
      `Your fist lands flimsily, blocked by the [enemy].`,
      `The [enemy] moves to block your punch.`,
      `The [enemy] reflexively dodges your fist.`
    ],
    [...getDamageEffects(2, 6)],
    []
  ),

  slap: genMoveData(
    "slap",
    50,
    3,
    [
      `Your hand clashes against the [enemy].`,
      `You slap the [enemy].`,
      `You land a solid slap. THWACK!`,
      `Your palm stings as it collides into the [enemy].`
    ],
    [
      `Your hand lands flimsily, blocked by the [enemy].`,
      `The [enemy] moves to block your slap.`,
      `The [enemy] reflexively dodges your strike.`
    ],
    [...getDamageEffects(2, 6)],
    []
  )
};
