export interface DelayedEffect {
  delay?: number;
  effect: Function;
}

export interface Move {
  accuracy: number;
  animation: string;
  condition: Function;
  cooldown: number;
  delayedEffects: DelayedEffect[];
  hitPhrase: string | string[];
  instantEffects: Function[];
  missPhrase: string | string[];
  name: string;
  probability: number;
}
