import type { Move } from "../../../models/Move";
import { CombatMoveData } from "$lib/data/combat/CombatMoveData";
import { resolvePossibleOptionArray } from "../MathUtils";

const getDefaultMetadata = (): Move => CombatMoveData["kick"];

export const getCombatMoveData = (name: string): Move => {
  const meta = CombatMoveData[name];
  if (!meta) {
    console.error(`Could not find combat move metadata for ${name}`);
    return getDefaultMetadata();
  }
  return meta;
};
