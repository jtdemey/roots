import type { GameEvent } from "../../models/GameEvent";
import { appendCombatLine } from "$lib/stores/combat/CombatStore";
import { CombatCommands } from "$lib/data/parser/CombatCommands";
import { genGameEvent } from "$lib/utils/GameEventUtils";
import { collectEvents, isAlias, splitRawInput } from "$lib/utils/ParserUtils";

export const parseCombat = (raw: string, currentTick: number): GameEvent[] => {
  let queuedEvents: GameEvent[] = [];
  const input: string[] = splitRawInput(raw);
  if (input.length < 1) return queuedEvents;
  const keyword = input[0];
  Object.keys(CombatCommands).forEach((commandName: string) => {
    const currentCmd = CombatCommands[commandName];
    if (isAlias(commandName, keyword)) {
      queuedEvents = collectEvents(
        queuedEvents,
        currentCmd.action(input, currentTick)
      );
    }
  });
  if (queuedEvents.length < 1) {
    queuedEvents.push(
      genGameEvent(currentTick, () => appendCombatLine(`You cannot "${input[0]}" right now.`))
    );
  }
  return queuedEvents;
};
