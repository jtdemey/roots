import type { Enemy } from "../../models/Enemy";
import type { EnemyMetadata } from "../../models/meta/EnemyMetadata";
import type { GameEvent } from "../../models/GameEvent";
import type { Move } from "../../models/Move";
import { get } from "svelte/store";
import { CombatCommands } from "$lib/data/parser/CombatCommands";
import { appendCombatLine, attack } from "$lib/stores/combat/CombatStore";
import { getEnemyMetadata } from "$lib/utils/selectors/EnemySelectors";
import { getCombatMoveData } from "$lib/utils/selectors/MoveSelectors";
import { genGameEvent, queueEventNow } from "$lib/utils/GameEventUtils";
import { collectEvents, isAlias, splitRawInput } from "$lib/utils/ParserUtils";
import { between, resolvePossibleOptionArray } from "$lib/utils/MathUtils";

const EnemyAliases: string[] = [
  "animal",
  "anywhere",
  "bad",
  "baddie",
  "baddy",
  "creature",
  "em",
  "enemy",
  "entity",
  "figure",
  "goon",
  "it",
  "something",
  "them",
  "thing"
];

export const parseAttackMove = (
  input: string[],
  currentTick: number,
  enemy: Enemy
): GameEvent[] => {
  const queuedEvents: GameEvent[] = [];
  const moveData: Move = getCombatMoveData(input[0]);
  const enemyData: EnemyMetadata = getEnemyMetadata(enemy.name);
  const isTargetingEnemy: boolean =
    input.length === 1 ||
    (input.length > 1 &&
      (input[1] === enemyData.display.toLowerCase() ||
        EnemyAliases.indexOf(input[1]) > -1));

  if (isTargetingEnemy) {
    const roll = between(1, 100);
    const threshold = (get(attack) + moveData.accuracy) / 2;
    console.log(roll, threshold);
    const hit: boolean = roll <= threshold;
    if (hit) {
      moveData.instantEffects.forEach((instantEffect: Function) => {
        queueEventNow(queuedEvents, currentTick, () => instantEffect());
      });
      queueEventNow(queuedEvents, currentTick, () =>
        appendCombatLine(resolvePossibleOptionArray(moveData.hitPhrase), enemyData.display.toLowerCase())
      );
      return queuedEvents;
    }
    queueEventNow(queuedEvents, currentTick, () =>
      appendCombatLine(resolvePossibleOptionArray(moveData.missPhrase))
    );
  }

  return queuedEvents;
};

export const parseCombat = (
  raw: string,
  currentTick: number,
  enemy: Enemy
): GameEvent[] => {
  let queuedEvents: GameEvent[] = [];
  const input: string[] = splitRawInput(raw);
  if (input.length < 1) return queuedEvents;
  Object.keys(CombatCommands).forEach((commandName: string) => {
    const currentCmd = CombatCommands[commandName];
    if (isAlias(commandName, input[0])) {
      queuedEvents = collectEvents(
        queuedEvents,
        currentCmd.action(input, currentTick, enemy)
      );
    }
  });
  if (queuedEvents.length < 1) {
    queuedEvents.push(
      genGameEvent(currentTick, () =>
        appendCombatLine(`You cannot "${input[0]}" right now.`)
      )
    );
  }
  return queuedEvents;
};
