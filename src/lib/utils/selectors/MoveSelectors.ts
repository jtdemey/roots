import type { Move } from "../../../models/meta/Move";
import { CombatMoveData } from "$lib/data/combat/CombatMoveData";

const getDefaultMetadata = (): Move => CombatMoveData["kick"];

export const getCombatMoveData = (name: string): Move => {
  const meta = CombatMoveData[name];
  if (!meta) {
    console.error(`Could not find combat move metadata for ${name}`);
    return getDefaultMetadata();
  }
  return meta;
};
