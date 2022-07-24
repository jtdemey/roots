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
  easing: any = cubicOut,
  delay: number = 0
): CombatKeyframe => ({ value, tweenConfig: { delay, duration, easing } });

export const CombatAnimationData: ICombatAnimationData = {
  impact: {
    keyframes: [
      genAnim(0, 20),
      genAnim(8, 80),
      genAnim(-5, 60),
      genAnim(5, 60),
      genAnim(0, 120)
    ]
  },
  lunge: {
    keyframes: [
      genAnim(18, 100),
      genAnim(-2, 80),
      genAnim(0, 200)
    ]
  }
};
