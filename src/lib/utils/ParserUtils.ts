import type { GameEvent } from "src/models/GameEvent";
import { GameCommands } from "$lib/data/parser/GameCommands";

export const collectEvents = (
  queue: GameEvent[],
  events: GameEvent[]
): GameEvent[] => (events.length < 1 ? queue : queue.concat(events));

export const isAlias = (commandName: string, comparator: string): boolean =>
  commandName === comparator ||
  (GameCommands[commandName] !== undefined &&
    GameCommands[commandName].aliases.indexOf(comparator) > -1);

export const splitRawInput = (raw: string): string[] =>
  raw
    .trim()
    .split(" ")
    .filter((str: string) => str !== "")
    .map((str: string) => str.toLowerCase());
