import type { Move } from "../../../models/Move";
import { hurtEnemy } from "$lib/stores/combat/CombatStore";
import { between } from "$lib/utils/MathUtils";

interface ICombatMoveData {
  [key: string]: Move;
}

const genMoveData = (
  name: string,
  hitPhrase: string | string[],
  missPhrase: string | string[],
  activeEffects: any[],
  instantEffects: Function[],
  condition: Function = () => true
): Move => ({
  activeEffects,
  condition,
  hitPhrase,
  instantEffects,
  missPhrase,
  name
});

export const CombatMoveData: any = {
  kick: genMoveData(
    "kick",
    `You kick the [enemy].`,
    [`Your kick fails to land a solid hit.`, `Your kick falters and misses.`],
    [],
    [() => hurtEnemy(between(4, 8))]
  )
};
