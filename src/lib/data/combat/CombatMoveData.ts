import type { Move } from "../../../models/Move";
import { hurtEnemy } from "$lib/stores/combat/CombatStore";
import { between } from "$lib/utils/MathUtils";

interface ICombatMoveData {
  [key: string]: Move;
}

const genMoveData = (
  name: string,
  accuracy: number,
  cooldown: number,
  hitPhrase: string | string[],
  missPhrase: string | string[],
  activeEffects: any[],
  instantEffects: Function[],
  condition: Function = () => true
): Move => ({
  accuracy,
  activeEffects,
  condition,
  cooldown,
  hitPhrase,
  instantEffects,
  missPhrase,
  name
});

export const CombatMoveData: any = {
  kick: genMoveData(
    "kick",
    80,
    4,
    [`You land a solid kick on the [enemy].`, `You drive the heel of your boot into the [enemy].`],
    [`Your kick fails to land a solid hit.`, `Your kick falters and misses.`],
    [],
    [() => hurtEnemy(between(2, 5))]
  )
};
