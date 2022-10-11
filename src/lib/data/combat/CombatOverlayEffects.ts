export interface ICombatOverlayEffect {
  duration: number;
  gradients: string[];
}

interface ICombatOverlayEffects {
  [key: string]: ICombatOverlayEffect;
}

const f = (duration: number, gradients: string[]): ICombatOverlayEffect => ({ duration, gradients });

export const CombatOverlayEffects: ICombatOverlayEffects = {
  injury: f(0, ["90deg", "red 10%", "rgba(0, 0, 0, 0.0)"])
};
