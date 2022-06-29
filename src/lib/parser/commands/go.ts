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
import { Directions } from "$lib/data/world/Directions";
import { DirectionAliases } from "$lib/data/world/DirectionAliases";
import { PlayerFlags } from "$lib/data/player/PlayerFlags";
import {
  disableForFlags,
  genGameEvent,
  queueEventNow
} from "$lib/utils/GameEventUtils";
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

  const allowed = disableForFlags(
    [PlayerFlags.Running],
    queuedEvents,
    currentTick
  );
  if (!allowed) return queuedEvents;

  const currentPlayerFlags: PlayerFlags[] = get(playerFlags);
  let isRunning: boolean = false;

  if (input.length === 1) {
    //"run" subcommand
    if (isRunAlias(input[0])) {
      if (
        currentPlayerFlags.some(
          (flag: PlayerFlags) => flag === PlayerFlags.Exiting
        )
      ) {
        queueEventNow(
          queuedEvents,
          currentTick,
          () => runWhileExitingLocale(),
          [GameEventFlags.Run]
        );
        isRunning = true;
        const arriveEvent: GameEvent = get(gameEvents).filter(
          (gameEvent: GameEvent) =>
            gameEvent.eventFlags &&
            gameEvent.eventFlags.some(
              (flag: GameEventFlags) => flag === GameEventFlags.Arrive
            )
        )[0];

        if (!arriveEvent || !arriveEvent.eventName) {
          return queuedEvents;
        }

        const targetLocale: Locale = getLocale(arriveEvent.eventName.replace("arriveat-", ""));
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
        return queuedEvents;
      }
    }

    if (!isRunning) {
      queueEventNow(queuedEvents, currentTick, () =>
        appendLine(`Specify a direction, such as "north" or "outside".`)
      );
      return queuedEvents;
    }
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

  isRunning = isRunAlias(input[0]);
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
  console.log(queuedEvents);
  return queuedEvents;
};
