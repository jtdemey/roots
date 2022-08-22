import type { Move } from "../../../models/Move";
import { affectPlayerHealth } from "$lib/stores/player/PlayerStore";
import { between } from "$lib/utils/MathUtils";
import { genMoveData } from "../combat/CombatMoveData";

interface IEnemyMoveData {
  [key: string]: Move;
}

export const EnemyMoveData: IEnemyMoveData = {
  bite: genMoveData(
    "bite",
    0.4,
    8,
    "Its jaw clamps down on your leg, causing a searing pain.",
    "The [enemy] gnashes its teeth and lunges, narrowly missing.",
    [],
    [() => affectPlayerHealth(between(3, 11))]
  )
};
