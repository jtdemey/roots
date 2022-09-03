<script type="ts">
  import type { Enemy } from "../../../models/Enemy";
  import type { DelayedEffect, Move } from "../../../models/Move";
  import { onMount } from "svelte";
  import {
    appendCombatLine,
    enemyCooldown,
    evasion,
    setEnemyAnimation,
    setEnemyCooldown
  } from "$lib/stores/combat/CombatStore";
  import { registerGameEvent, tick } from "$lib/stores/game/GameStore";
  import { getNextMove } from "$lib/utils/CombatUtils";
  import { genGameEvent } from "$lib/utils/GameEventUtils";
  import { between, resolvePossibleOptionArray } from "$lib/utils/MathUtils";

  export let currentEnemy: Enemy | undefined = undefined;

  let playerIsApproaching: boolean = true;

  const attackPlayer = (): void => {
    if (!currentEnemy) return;
    const queueEvent = (action: Function, targetTick?: number): void =>
      registerGameEvent(genGameEvent(targetTick || $tick, () => action()));
    const nextMove: Move = getNextMove(currentEnemy);

    const rollToHit: number = Math.random();
    if (rollToHit > nextMove.accuracy + $evasion) {
      const missEffects: Function[] = [
        () => setEnemyAnimation("reverselunge"),
        () => setEnemyCooldown(nextMove.cooldown),
        () => appendCombatLine(resolvePossibleOptionArray(nextMove.missPhrase))
      ];
      missEffects.forEach((effect: Function) => queueEvent(effect));
      queueEvent(() => setEnemyCooldown(0), $tick + nextMove.cooldown);
      return;
    }

    if (nextMove.instantEffects.length > 0) {
      nextMove.instantEffects.forEach((effect: Function) => queueEvent(effect));
    }
    if (nextMove.delayedEffects.length > 0) {
      nextMove.delayedEffects.forEach((delayedEffect: DelayedEffect) => {
        queueEvent(() => delayedEffect.effect(), $tick + nextMove.cooldown);
      });
    }
    const attackEffects: Function[] = [
      () => setEnemyAnimation(nextMove.animation),
      () => setEnemyCooldown(nextMove.cooldown),
      () => appendCombatLine(resolvePossibleOptionArray(nextMove.hitPhrase))
    ];
    attackEffects.forEach((effect: Function) => queueEvent(effect));
    queueEvent(() => setEnemyCooldown(0), $tick + nextMove.cooldown);
  };

  $: if ($enemyCooldown < 1 && !playerIsApproaching) {
    attackPlayer();
  }

  onMount(() => {
    const delayBeforeAction: number = between(2, 6);
    registerGameEvent(
      genGameEvent($tick + delayBeforeAction, () => {
        attackPlayer();
        playerIsApproaching = false;
      })
    );
  });
</script>

<div />

<style>
  div {
    position: absolute;
    width: 0px;
    height: 0px;
  }
</style>
