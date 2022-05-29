import { appendLine } from "$lib/stores/game/GameStore";
import { isAlias } from "$lib/data/parser/CommandAliases";
import type { GameEvent } from "../../models/GameEvent";

const collectEvents = (queue: GameEvent[], events: GameEvent[]): GameEvent[] =>
  events.length < 1 ? queue : queue.concat(events);

const genGameEvent = (triggerTick: number, action: Function) => ({
  triggerTick,
  action
});

export const parseInput = (raw: string, currentTick: number): GameEvent[] => {
  let queuedEvents: GameEvent[] = [];
  const input: string[] = raw
    .trim()
    .split(" ")
    .map((str: string) => str.toLowerCase());
  if (input.length < 1) return queuedEvents;
	const keyword = input[0];
	if (isAlias("go", keyword)) {
		return collectEvents(queuedEvents, parseGo(input, currentTick));
	}
	if (queuedEvents.length < 1) {
		queuedEvents.push(genGameEvent(currentTick, () => appendLine("I can't understand that.")));
	}
  return queuedEvents;
};

const parseGo = (input: string[], currentTick: number): GameEvent[] => {
  const queuedEvents: GameEvent[] = [];
  if (!Array.isArray(input)) {
    queuedEvents.push(genGameEvent(currentTick, () => appendLine("aosdifj")));
  }
  return queuedEvents;
};