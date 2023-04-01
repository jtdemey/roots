import type { Move } from "../../../models/Move";
import { hurtPlayer, setPlayerAnimation } from "$lib/stores/combat/CombatStore";
import { between } from "$lib/utils/MathUtils";
import { genMoveData } from "../combat/CombatMoveData";

interface IEnemyMoveData {
  [key: string]: Move;
}

export const EnemyMoveData: IEnemyMoveData = {
  bite: genMoveData(
    0.6,
    7,
    [
      "Its jaw clamps down on your leg, causing a searing pain.",
      "The [enemy] sinks its teeth into your flesh.",
      "Teeth sink into your flesh",
      "Pain jolts as its jaw clamps down."
    ],
    [
      `Its jaw lunges past you, missing.`,
      `The [enemy] gnashes its teeth and lunges, narrowly missing.`,
      "It narrowly misses."
    ],
    [() => hurtPlayer(between(6, 12)), () => setPlayerAnimation("impact")],
    [],
    "reverselunge"
  ),

  claw: genMoveData(
    "claw",
    0.7,
    5,
    [
      "Its claws lash into you."
    ],
    [
      "Its claws whiz by as it strikes."
    ],
    [() => hurtPlayer(between(3, 7)), () => setPlayerAnimation("impact")],
    [],
    "reverselunge"
  ),
};
