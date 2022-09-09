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
  opacity: number = 1.0,
  easing: any = cubicOut,
  delay: number = 0
): CombatKeyframe => ({ x, y, opacity, tweenConfig: { delay, duration, easing } });

export const CombatAnimationData: ICombatAnimationData = {
  death: {
    keyframes: [
      genAnim(0, 12, 50),
      genAnim(1, 13, 100),
      genAnim(-2, 14, 100),
      genAnim(2, 13, 900),
      genAnim(0, 50, 200, 0.0)
    ]
  },
  impact: {
    keyframes: [
      genAnim(0, 0, 20),
      genAnim(12, -12, 80),
      genAnim(-9, -6, 60),
      genAnim(7, 9, 60),
      genAnim(0, 0, 120)
    ]
  },
  lunge: {
    keyframes: [
      genAnim(18, -12, 100),
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
