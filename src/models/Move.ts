export interface Move {
  accuracy: number;
  activeEffects: any[];
  condition: Function;
  hitPhrase: string | string[];
  instantEffects: Function[];
  missPhrase: string | string[];
  name: string;
}
