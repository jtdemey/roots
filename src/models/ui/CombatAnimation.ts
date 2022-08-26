export interface CombatKeyframe {
  x: number;
  y: number;
  tweenConfig: object;
}

export interface CombatAnimation {
  keyframes: CombatKeyframe[];
}
