import type { GameCommand } from "src/models/GameCommand";
import type { GameEvent } from "../../models/GameEvent";
import { appendLine } from "$lib/stores/game/GameStore";
import { GameCommands } from "$lib/data/parser/GameCommands";
import { disableForFlags, genGameEvent } from "$lib/utils/GameEventUtils";
import { collectEvents, isAlias, splitRawInput } from "$lib/utils/ParserUtils";
import { applyColorPrefix } from "$lib/utils/ColorUtils";
import { GameColors } from "$lib/data/ui/GameColors";

export const parseInput = (raw: string, currentTick: number): GameEvent[] => {
  let queuedEvents: GameEvent[] = [];
  const input: string[] = splitRawInput(raw);
  if (input.length < 1) return queuedEvents;

  const keywords = [input[0]];
  if (input.length > 1) {
    keywords.push(input[1]);
  }

  Object.keys(GameCommands).forEach((commandName: string) => {
    const currentCmd: GameCommand = GameCommands[commandName];
    let cmdFound: boolean = false;

    // Two word keywords eg. "look at"
    if (keywords.length > 1) {
      const joinedKeywords = keywords.join(" ");
      if (isAlias(commandName, joinedKeywords)) {
        const allowed: boolean = disableForFlags(
          currentCmd.disabledForFlags || [],
          queuedEvents,
          currentTick
        );
        if (!allowed) return queuedEvents;
        const arrangedInput: string[] = [
          `${input[0]} ${input[1]}`,
          ...input.slice(2, input.length)
        ];
        queuedEvents = collectEvents(
          queuedEvents,
          currentCmd.action(arrangedInput, currentTick)
        );
        cmdFound = true;
      }
    }

    if (!cmdFound && isAlias(commandName, keywords[0])) {
      const allowed: boolean = disableForFlags(
        currentCmd.disabledForFlags || [],
        queuedEvents,
        currentTick
      );
      if (!allowed) return queuedEvents;
      queuedEvents = collectEvents(
        queuedEvents,
        currentCmd.action(input, currentTick)
      );
    }
  });

  if (queuedEvents.length < 1) {
    queuedEvents.push(
      genGameEvent(currentTick, () =>
        appendLine(
          applyColorPrefix(
            "I can't understand that.",
            GameColors.console.system
          )
        )
      )
    );
  }
  return queuedEvents;
};
