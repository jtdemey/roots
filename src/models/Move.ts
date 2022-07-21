export interface Move {
  accuracy: number;
  activeEffects: any[];
  condition: Function;
  cooldown: number;
  hitPhrase: string | string[];
  instantEffects: Function[];
  missPhrase: string | string[];
  name: string;
}
