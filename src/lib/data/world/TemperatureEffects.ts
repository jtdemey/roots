import type { TemperatureEffect } from "../../../models/TemperatureEffect";

const genTempEff = (
  dipPhrase: string,
  risePhrase: string,
  dipAction: Function = () => false,
  riseAction: Function = () => false
): TemperatureEffect => ({
  dipAction,
  dipPhrase,
  riseAction,
  risePhrase
});

export const TemperatureEffects: any = {
  Dead: genTempEff("You freeze to death.", ""),
  Unconscious: genTempEff(
    "The world grows blurry and dark as you collapse to the ground.",
    ""
  ),
  Frozen: genTempEff(
    "The frost has begun to overtake your flesh.",
    "You awaken, weak, to unbearable cold."
  ),
  Sleepy: genTempEff(
    "Your limbs feel heavy. The world is growing dark.",
    "You feel moisture from the frost thawing off your skin."
  ),
  Frigid: genTempEff(
    "The frigid air stiffens your limbs.",
    "You resist the cold's lure to eternal slumber as you feel your mental faculties rejuvenating."
  ),
  Disoriented: genTempEff(
    "You feel disoriented from the harsh cold. Your shivering is uncontrollable.",
    "You feel mobility return to your limbs."
  ),
  Shivering: genTempEff(
    "Your teeth chatter as your body begins shivering.",
    "You shiver as you feel a stinging sensation return to your flesh."
  ),
  Normal: genTempEff(
    "",
    "You cease shivering."
  ),
  Hot: genTempEff("You feel overheated as you begin sweating.", "")
};
