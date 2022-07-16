import type { Enemy } from "../../models/Enemy";
import type { GameEvent } from "../../models/GameEvent";
import { appendCombatLine } from "$lib/stores/combat/CombatStore";
import { CombatCommands } from "$lib/data/parser/CombatCommands";
import { genGameEvent } from "$lib/utils/GameEventUtils";
import { collectEvents, isAlias, splitRawInput } from "$lib/utils/ParserUtils";

export const parseAttackMove = (input: string[], currentTick: number): GameEvent[] => {
  const queuedEvents: GameEvent[] = [];
  const moveData: Move = getCombatMoveData(input[0]);
  
  if (input.length === 1) {
    //const miss: boolean = 
    moveData.instantEffects.forEach((instantEffect: Function) => {
      queueEventNow(queuedEvents, currentTick, () => instantEffect());
    });
    queueEventNow(queuedEvents, currentTick, () => appendCombatLine(moveData.hitPhrase));
  }

  return queuedEvents;
};

export const parseCombat = (raw: string, currentTick: number, enemy: Enemy): GameEvent[] => {
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
