import type { GameEvent } from "../../../models/GameEvent";
import type { Item } from "../../../models/Item";
import type { Locale } from "../../../models/Locale";
import { get } from "svelte/store";
import { locale } from "$lib/stores/player/PlayerStore";
import { getLocale } from "$lib/utils/selectors/WorldSelectors";
import { queueEventNow } from "$lib/utils/GameEventUtils";
import { appendLine } from "$lib/stores/game/GameStore";

export const parseExamine = (
  input: string[],
  currentTick: number
): GameEvent[] => {
  const queuedEvents: GameEvent[] = [];
  const currentLocale: Locale = getLocale(get(locale));
  if (input.length === 1) {
    const phrase: string = get(currentLocale.examinePhrase);
    if (phrase) {
      queueEventNow(queuedEvents, currentTick, () => appendLine(phrase));
    }
    return queuedEvents;
  }
  const target: string = input[1];
  const localeItems: Item[] = get(currentLocale.items);
  return queuedEvents;
};
