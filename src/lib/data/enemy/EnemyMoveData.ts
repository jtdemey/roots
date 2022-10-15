import type { Move } from "../../../models/Move";
import { hurtPlayer, setPlayerAnimation } from "$lib/stores/combat/CombatStore";
import { between } from "$lib/utils/MathUtils";
import { genMoveData } from "../combat/CombatMoveData";

interface IEnemyMoveData {
  [key: string]: Move;
}

export const EnemyMoveData: IEnemyMoveData = {
  bite: genMoveData(
    "bite",
    0.6,
    7,
    [
      "Its jaw clamps down on your leg, causing a searing pain.",
      `The [enemy] sinks its teeth into your flesh.`
    ],
    [
      `Its jaw lunges past you, missing.`,
      `The [enemy] gnashes its teeth and lunges, narrowly missing.`
    ],
    [() => hurtPlayer(between(6, 12)), () => setPlayerAnimation("impact")],
    [],
    "reverselunge"
  )
};
