export interface Move {
  accuracy: number;
  activeEffects: any[];
  animation: string;
  condition: Function;
  cooldown: number;
  hitPhrase: string | string[];
  instantEffects: Function[];
  missPhrase: string | string[];
  name: string;
  probability: number;
}
