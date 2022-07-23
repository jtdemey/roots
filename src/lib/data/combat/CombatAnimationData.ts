import type {
  CombatKeyframe,
  CombatAnimation
} from "../../../models/ui/CombatAnimation";
import { cubicOut, linear } from "svelte/easing";

interface ICombatAnimationData {
  [key: string]: CombatAnimation;
}

const genAnim = (
  value: number,
  duration: number,
  easing: any,
  delay: number = 0
): CombatKeyframe => ({ value, tweenConfig: { delay, duration, easing } });

export const CombatAnimationData: ICombatAnimationData = {
  impact: {
    keyframes: [
      genAnim(8, 80, cubicOut),
      genAnim(-5, 60, cubicOut),
      genAnim(5, 60, cubicOut),
      genAnim(0, 120, cubicOut)
    ]
  }
};
