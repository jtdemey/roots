import type { Move } from "../../../models/Move";
import { hurtEnemy, setPlayerAnimation } from "$lib/stores/combat/CombatStore";
import { between } from "$lib/utils/MathUtils";

interface ICombatMoveData {
  [key: string]: Move;
}

export const genMoveData = (
  name: string,
  accuracy: number,
  cooldown: number,
  hitPhrase: string | string[],
  missPhrase: string | string[],
  activeEffects: any[],
  instantEffects: Function[],
  probability: number = 1.0,
  condition: Function = () => true
): Move => ({
  accuracy,
  activeEffects,
  animation: "lunge",
  condition,
  cooldown,
  hitPhrase,
  instantEffects,
  missPhrase,
  name,
  probability
});

export const CombatMoveData: ICombatMoveData = {
  headbutt: genMoveData(
    "headbutt",
    30,
    6,
    [
      `You headbutt the [enemy]`
    ],
    [
      `Your head whooshes past the [enemy]`
    ],
    [],
    [() => hurtEnemy(between(1, 8)), () => setPlayerAnimation("lunge")]
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
    [],
    [() => hurtEnemy(between(4, 7)), () => setPlayerAnimation("lunge")]
  ),
  punch: genMoveData(
    "punch",
    50,
    2,
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
    [],
    [() => hurtEnemy(between(2, 6)), () => setPlayerAnimation("lunge")]
  )
};
