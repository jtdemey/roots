export interface CombatKeyframe {
  x: number;
  y: number;
  opacity: number;
  tweenConfig: object;
}

export interface CombatAnimation {
  keyframes: CombatKeyframe[];
}
