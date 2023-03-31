import type { Enemy } from "../../models/Enemy";
import type { EnemyMetadata } from "../../models/meta/EnemyMetadata";
import type { GameEvent } from "../../models/GameEvent";
import type { DelayedEffect, Move } from "../../models/Move";
import { get } from "svelte/store";
import { CombatCommands } from "$lib/data/parser/CombatCommands";
import {
  appendCombatLine,
  attack,
  cooldown,
  setEnemyAnimation,
  setPlayerAnimation,
  setPlayerCooldown
} from "$lib/stores/combat/CombatStore";
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
  "monster",
  "something",
  "them",
  "thing",
  "villain"
];

const checkPlayerCooldown = (
  queuedEvents: GameEvent[],
  currentTick: number
): void => {
  const playerCooldown: number = get(cooldown);
  if (playerCooldown > 0) {
    queueEventNow(queuedEvents, currentTick, () =>
      appendCombatLine(`You have not yet recovered from your previous move.`)
    );
  }
};

export const parseAttackMove = (
  input: string[],
  currentTick: number,
  enemy: Enemy
): GameEvent[] => {
  const queuedEvents: GameEvent[] = [];
  checkPlayerCooldown(queuedEvents, currentTick);
  if (queuedEvents.length > 0) return queuedEvents;

  const moveData: Move = getCombatMoveData(input[0]);
  const enemyData: EnemyMetadata = getEnemyMetadata(enemy.name);
  const isTargetingEnemy: boolean =
    input.length === 1 ||
    (input.length > 1 &&
      (input[1] === enemyData.display.toLowerCase() ||
        EnemyAliases.indexOf(input[1]) > -1));

  if (isTargetingEnemy) {
    let hit: boolean = moveData.accuracy === 100;
    if (!hit) {
      const roll = between(1, 100);
      const threshold = (get(attack) + moveData.accuracy) / 2;
      hit = roll <= threshold;
    }

    const enemyName: string = enemyData.display.toLowerCase();
    if (hit) {
      moveData.instantEffects.forEach((instantEffect: Function) => {
        queueEventNow(queuedEvents, currentTick, () => instantEffect());
      });
      const hitEvents: Function[] = [
        () =>
          appendCombatLine(
            resolvePossibleOptionArray(moveData.hitPhrase),
            enemyName
          ),
        () => setPlayerCooldown(moveData.cooldown)
      ];
      hitEvents.forEach((action: Function) =>
        queueEventNow(queuedEvents, currentTick, action)
      );
      queueEventNow(queuedEvents, currentTick + moveData.cooldown, () =>
        setPlayerCooldown(0)
      );

      moveData.delayedEffects.forEach((delayedEffect: DelayedEffect) => {
        const delay: number = delayedEffect.delay || moveData.cooldown;
        queueEventNow(queuedEvents, currentTick + delay, () =>
          delayedEffect.effect()
        );
      });

      return queuedEvents;
    }

    const missEvents: Function[] = [
      () =>
        appendCombatLine(
          resolvePossibleOptionArray(moveData.missPhrase),
          enemyName
        ),
      () => setPlayerAnimation("lunge")
    ];
    missEvents.forEach((action: Function) =>
      queueEventNow(queuedEvents, currentTick, action)
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
