import type {
  CombatKeyframe,
  CombatAnimation
} from "../../../models/ui/CombatAnimation";
import { cubicOut } from "svelte/easing";

interface ICombatAnimationData {
  [key: string]: CombatAnimation;
}

const genAnim = (
  x: number,
  y: number,
  duration: number,
  easing: any = cubicOut,
  delay: number = 0
): CombatKeyframe => ({ x, y, tweenConfig: { delay, duration, easing } });

export const CombatAnimationData: ICombatAnimationData = {
  impact: {
    keyframes: [
      genAnim(0, 0, 20),
      genAnim(8, -8, 80),
      genAnim(-5, -2, 60),
      genAnim(5, 4, 60),
      genAnim(0, 0, 120)
    ]
  },
  lunge: {
    keyframes: [
      genAnim(18, 12, 100),
      genAnim(-2, 2, 80),
      genAnim(0, 0, 200)
    ]
  },
  reverselunge: {
    keyframes: [
      genAnim(-21, 14, 100),
      genAnim(-4, -2, 80),
      genAnim(0, 0, 200)
    ]
  },
};
