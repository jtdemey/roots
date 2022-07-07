import type { GameEvent } from "../../models/GameEvent";

export const parseCombat = (raw: string, currentTick: number): GameEvent[] => {
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
