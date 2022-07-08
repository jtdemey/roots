import type { GameEvent } from "../../models/GameEvent";
import { appendLine } from "$lib/stores/game/GameStore";
import { GameCommands } from "$lib/data/parser/GameCommands";
import { genGameEvent } from "$lib/utils/GameEventUtils";
import { collectEvents, isAlias, splitRawInput } from "$lib/utils/ParserUtils";

export const parseInput = (raw: string, currentTick: number): GameEvent[] => {
  let queuedEvents: GameEvent[] = [];
  const input: string[] = splitRawInput(raw);
  if (input.length < 1) return queuedEvents;
  const keyword = input[0];
  Object.keys(GameCommands).forEach((commandName: string) => {
    const currentCmd = GameCommands[commandName];
    if (isAlias(commandName, keyword)) {
      queuedEvents = collectEvents(
        queuedEvents,
        currentCmd.action(input, currentTick)
      );
    }
  });
  if (queuedEvents.length < 1) {
    queuedEvents.push(
      genGameEvent(currentTick, () => appendLine("I can't understand that."))
    );
  }
  return queuedEvents;
};
