import type { Exit } from "../../../models/Exit";
import type { GameEvent } from "../../../models/GameEvent";
import { GameEventFlags } from "$lib/data/game/GameEventFlags";
import type { Locale } from "../../../models/Locale";
import { get } from "svelte/store";
import {
  appendLine,
  appendRandomLine,
  gameEvents
} from "$lib/stores/game/GameStore";
import {
  enterLocale,
  locale,
  playerFlags,
  runWhileExitingLocale
} from "$lib/stores/player/PlayerStore";
import { DirectionAliases } from "$lib/data/world/DirectionAliases";
import { PlayerFlags } from "$lib/data/player/PlayerFlags";
import {
  disableForFlags,
  genGameEvent,
  queueEventNow
} from "$lib/utils/GameEventUtils";
import { getLocale } from "$lib/utils/selectors/WorldSelectors";
import { getVisibleExits } from "$lib/utils/world/WorldUtils";
import { GameColors } from "$lib/data/ui/GameColors";

export const RunningAliases: string[] = [
  "dart",
  "gallop",
  "race",
  "run",
  "rush",
  "scamper",
  "spring",
  "sprint"
];

const exitLocale = (
  targetExit: Exit,
  queuedEvents: GameEvent[],
  currentLocale: Locale,
  currentTick: number,
  isRunning: boolean,
  directionInput: string = targetExit.direction
) => {
  playerFlags.update((currentFlags: PlayerFlags[]) =>
    currentFlags.concat([PlayerFlags.Exiting])
  );
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

  const exitDuration: number = isRunning
    ? currentTick + targetExit.duration / 2
    : currentTick + targetExit.duration;

  queuedEvents.push(
    genGameEvent(
      exitDuration,
      () => enterLocale(destination),
      [GameEventFlags.Arrive],
      [GameEventFlags.Run],
      `arriveat-${destination.name}`
    )
  );
  return queuedEvents;
};

export const getIntendedDirection = (input: string[]): string => {
  let intendedDirection: string = "";
  if (input.length === 1) {
    const parsedDirection: string = parseDirection(input[0]);
    if (parsedDirection) {
      intendedDirection = parsedDirection;
    }
  } else if (input.length > 1) {
    const parsedDirection: string = parseDirection(input[1]);
    if (parsedDirection) {
      intendedDirection = parsedDirection;
    }
  }
  return intendedDirection;
};

const handleRunningWhileExiting = (
  queuedEvents: GameEvent[],
  currentTick: number,
  isRunning: boolean
): boolean => {
  queueEventNow(queuedEvents, currentTick, () => runWhileExitingLocale(), [
    GameEventFlags.Run
  ]);
  isRunning = true;
  const arriveEvent: GameEvent = get(gameEvents).filter(
    (gameEvent: GameEvent) =>
      gameEvent.eventFlags &&
      gameEvent.eventFlags.some(
        (flag: GameEventFlags) => flag === GameEventFlags.Arrive
      )
  )[0];

  if (!arriveEvent || !arriveEvent.eventName) {
    return isRunning;
  }

  const targetLocale: Locale = getLocale(
    arriveEvent.eventName.replace("arriveat-", "")
  );
  const tickDifference = arriveEvent.triggerTick - currentTick;
  queuedEvents.push(
    genGameEvent(
      currentTick + tickDifference / 2,
      () => enterLocale(targetLocale),
      [GameEventFlags.Arrive],
      undefined,
      `arriveat-${targetLocale.name}`
    )
  );
  return isRunning;
};

export const isRunAlias = (str: string): boolean =>
  RunningAliases.some((alias: string) => alias === str.toLocaleLowerCase());

export const parseDirection = (dirInput: string): string => {
  let result: string = "";
  if (!dirInput) return result;
  const intention = dirInput.toLocaleLowerCase();
  Object.keys(DirectionAliases).forEach((aliasCollectionKey: string) => {
    const directionKey: string = aliasCollectionKey.toLocaleLowerCase();
    if (intention === directionKey) {
      result = directionKey;
      return;
    }
    const aliasCollection = DirectionAliases[aliasCollectionKey];
    aliasCollection.forEach((alias: string) => {
      if (intention === alias.toLocaleLowerCase()) {
        result = directionKey;
        return;
      }
    });
  });
  return result;
};

export const parseGo = (input: string[], currentTick: number): GameEvent[] => {
  const queuedEvents: GameEvent[] = [];

  const allowed = disableForFlags(
    [PlayerFlags.Running],
    queuedEvents,
    currentTick
  );
  if (!allowed) return queuedEvents;

  const currentPlayerFlags: PlayerFlags[] = get(playerFlags);
  let isRunning: boolean = isRunAlias(input[0]);

  if (
    isRunning &&
    currentPlayerFlags.some((flag: PlayerFlags) => flag === PlayerFlags.Exiting)
  ) {
    isRunning = handleRunningWhileExiting(queuedEvents, currentTick, isRunning);
    return queuedEvents;
  }

  const intendedDirection: string = getIntendedDirection(input);
  const directionInput: string = parseDirection(intendedDirection);
  const localeName: string = get(locale);
  const currentLocale: Locale = getLocale(localeName);
  const localeExits: Exit[] = get(currentLocale.exits);
  const localeVisibility: number = get(currentLocale.visibility);
  const visibleExits: Exit[] = getVisibleExits(localeExits, localeVisibility);

  if (directionInput === "") {
    queueEventNow(queuedEvents, currentTick, () =>
      appendRandomLine([
        `"${intendedDirection}" isn't a valid direction.`,
        `I can't understand the direction "${intendedDirection}".`,
        `I don't understand the intended direction "${intendedDirection}".`,
        `Which way? "${intendedDirection}" won't do.`
      ])
    );
    return queuedEvents;
  }

  const intendedExits: Exit[] = visibleExits.filter(
    (exit: Exit) => exit.direction === directionInput
  );
  if (intendedExits.length < 1) {
    queueEventNow(queuedEvents, currentTick, () =>
      appendRandomLine([
        `You can't go that way.`,
        `There's no exit in that direction.`,
        `There's no exit ${directionInput.toLocaleLowerCase()}.`,
        `There is no passage ${directionInput.toLocaleLowerCase()}.`
      ], GameColors.console.system)
    );
    return queuedEvents;
  }

  exitLocale(
    intendedExits[0],
    queuedEvents,
    currentLocale,
    currentTick,
    isRunning,
    directionInput
  );
  return queuedEvents;
};
