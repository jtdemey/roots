import type { GameCommand } from "../../../models/GameCommand";
import { GameCommands } from "$lib/data/parser/GameCommands";

export const collectEvents = (queue: GameEvent[], events: GameEvent[]): GameEvent[] =>
  events.length < 1 ? queue : queue.concat(events);

export const isAlias = (commandName: string, comparator: string): boolean =>
  commandName === comparator ||
  (GameCommands[commandName] !== undefined &&
    GameCommands[commandName].aliases.indexOf(comparator) > -1);

export const genGameCommand = (
  name: string,
  action: Function,
  aliases: string[],
  cancels: any[] = []
): GameCommand => ({
  name,
  action,
  aliases,
  cancels
});
