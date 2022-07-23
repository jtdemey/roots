import type { CombatAnimation } from "../../../models/ui/CombatAnimation";
import { CombatAnimationData } from "$lib/data/combat/CombatAnimationData";

export const getCombatAnimationData = (
  animationName: string
): CombatAnimation => {
  const animData: CombatAnimation = CombatAnimationData[animationName];
  if (!animData) {
    console.error(`No combat animation found for key ${animationName}`);
  }
  return animData;
};
