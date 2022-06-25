import type { Exit } from "../../../models/Exit";
import type { GameEvent } from "../../../models/GameEvent";
import { GameEventFlags } from "$lib/data/game/GameEventFlags";
import type { Locale } from "../../../models/Locale";
import { get } from "svelte/store";
import {
  appendLine,
  appendRandomLine
} from "$lib/stores/game/GameStore";
import {
  locale,
  playerFlags,
  runWhileExitingLocale
} from "$lib/stores/player/PlayerStore";
import { Directions } from "$lib/data/world/Directions";
import { DirectionAliases } from "$lib/data/world/DirectionAliases";
import { PlayerFlags } from "$lib/data/player/PlayerFlags";
import { genGameEvent, queueEventNow } from "$lib/utils/GameEventUtils";
import { getLocale } from "$lib/utils/selectors/WorldSelectors";

const RunningAliases: string[] = [
  "dart",
  "gallop",
  "race",
  "run",
  "rush",
  "scamper",
  "spring",
  "sprint"
];

const isRunAlias = (str: string): boolean =>
  RunningAliases.some((alias: string) => alias === str.toLocaleLowerCase());

export const parseDirection = (dirInput: string): string => {
  let result: string = "";
  const intention = dirInput.toLocaleLowerCase();
  Object.keys(Directions).forEach((direction: string) => {
    if (intention === direction.toLocaleLowerCase()) {
      result = direction;
      return;
    }
  });
  Object.keys(DirectionAliases).forEach((aliasCollectionKey: string) => {
    const aliasCollection = DirectionAliases[aliasCollectionKey];
    aliasCollection.forEach((alias: string) => {
      if (intention === alias.toLocaleLowerCase()) {
        result = aliasCollectionKey.toLocaleLowerCase();
        return;
      }
    });
  });
  return result;
};

export const parseGo = (input: string[], currentTick: number): GameEvent[] => {
  const queuedEvents: GameEvent[] = [];
  if (input.length === 1) {
    if (isRunAlias(input[0])) {
      const currentPlayerFlags: PlayerFlags[] = get(playerFlags);
      if (
        currentPlayerFlags.some(
          (flag: PlayerFlags) => flag === PlayerFlags.Exiting
        )
      ) {
        queueEventNow(queuedEvents, currentTick, () => runWhileExitingLocale());
        return queuedEvents;
      }
    }
    queueEventNow(queuedEvents, currentTick, () =>
      appendLine(`Specify a direction, such as "north" or "outside".`)
    );
    return queuedEvents;
  }

  const directionInput: string = parseDirection(input[1]);
  if (directionInput === "") {
    queueEventNow(queuedEvents, currentTick, () =>
      appendLine(`I don't understand the intended direction "${input[1]}".`)
    );
    return queuedEvents;
  }

  const localeName: string = get(locale);
  const currentLocale: Locale = getLocale(localeName);
  const localeExits: Exit[] = get(currentLocale.exits);
  const intendedExits: Exit[] = localeExits.filter(
    (exit: Exit) => exit.direction === directionInput
  );
  if (intendedExits.length < 1) {
    queueEventNow(queuedEvents, currentTick, () =>
      appendRandomLine([
        `You can't go that way.`,
        `There's no exit in that direction.`,
        `There's no exit to the ${directionInput.toLocaleLowerCase()}.`,
        `There is no passage to the ${directionInput.toLocaleLowerCase()}.`
      ])
    );
    return queuedEvents;
  }

  playerFlags.update((currentFlags: PlayerFlags[]) =>
    currentFlags.concat([PlayerFlags.Exiting])
  );
  const targetExit: Exit = intendedExits[0];
  queueEventNow(
    queuedEvents,
    currentTick,
    () => appendLine(targetExit.exitPhrase),
    [GameEventFlags.Exit]
  );
  const destination: Locale = getLocale(targetExit.destination);
  if (!destination) {
    console.error(
      `No destination locale ${destination} to ${directionInput} of ${currentLocale.name}`
    );
  }

  queuedEvents.push(
    genGameEvent(currentTick + targetExit.duration, () => {
      playerFlags.update((currentFlags: PlayerFlags[]) =>
        currentFlags.filter((flag: PlayerFlags) => flag !== PlayerFlags.Exiting)
      );
      locale.set(destination.name);
      appendLine(get(destination.enterPhrase));
    })
  );
  return queuedEvents;
};
