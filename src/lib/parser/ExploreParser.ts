import type { GameEvent } from "../../models/GameEvent";
import { appendLine } from "$lib/stores/game/GameStore";
import { GameCommands } from "$lib/data/parser/GameCommands";

const collectEvents = (queue: GameEvent[], events: GameEvent[]): GameEvent[] =>
  events.length < 1 ? queue : queue.concat(events);

export const genGameEvent = (triggerTick: number, action: Function) => ({
  triggerTick,
  action
});

const isAlias = (commandName: string, comparator: string) =>
	commandName === comparator ||
	(GameCommands[commandName] !== undefined &&
		GameCommands[commandName].aliases.indexOf(comparator) > -1);

export const parseInput = (raw: string, currentTick: number): GameEvent[] => {
  let queuedEvents: GameEvent[] = [];
  const input: string[] = raw
    .trim()
    .split(" ")
    .filter((str: string) => str !== "")
    .map((str: string) => str.toLowerCase());
  if (input.length < 1) return queuedEvents;
  const keyword = input[0];
  Object.keys(GameCommands).forEach((commandName: string) => {
    const currentCmd = GameCommands[commandName];
    if (isAlias(commandName, keyword)) {
      queuedEvents = collectEvents(queuedEvents, currentCmd.action(input, currentTick));
    }
  });
  if (queuedEvents.length < 1) {
    queuedEvents.push(
      genGameEvent(currentTick, () => appendLine("I can't understand that."))
    );
  }
  return queuedEvents;
};
