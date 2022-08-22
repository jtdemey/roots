<script type="ts">
  import type { Enemy } from "../../../models/Enemy";
  import type { Move } from "../../../models/Move";
  import { onMount } from "svelte";
  import {
    enemyCooldown,
    setEnemyAnimation,
    setEnemyCooldown
  } from "$lib/stores/combat/CombatStore";
  import { registerGameEvent, tick } from "$lib/stores/game/GameStore";
  import { getNextMove } from "$lib/utils/CombatUtils";
  import { genGameEvent } from "$lib/utils/GameEventUtils";
  import { between } from "$lib/utils/MathUtils";

  export let currentEnemy: Enemy | undefined = undefined;

  const attackPlayer = (): void => {
    if (!currentEnemy) return;
    const nextMove: Move = getNextMove(currentEnemy);
    const queueEvent = (action: Function, targetTick?: number): void =>
      registerGameEvent(genGameEvent(targetTick || $tick, () => action()));
    if (nextMove.instantEffects.length > 0) {
      nextMove.instantEffects.forEach((effect: Function) => queueEvent(effect));
    }
    if (nextMove.activeEffects.length > 0) {
      nextMove.activeEffects.forEach((effects: Function[]) => {
        if (!Array.isArray) {
          console.error(`Array expected for active effect in ${nextMove.name}`);
          return;
        }
        queueEvent(effects[0]);
        queueEvent(effects[1], $tick + nextMove.cooldown);
      });
    }
    queueEvent(() => setEnemyAnimation(nextMove.animation));
    queueEvent(() => setEnemyCooldown(nextMove.cooldown));
    queueEvent(() => setEnemyCooldown(0), $tick + nextMove.cooldown);
  };

  $: {
    if ($enemyCooldown < 1) {
      attackPlayer();
    }
  }

  onMount(() => {
    const delayBeforeAction: number = between(2, 6);
    setTimeout(() => {
      attackPlayer();
    }, delayBeforeAction);
  });
</script>

<div />

<style>
  div {
    width: 0px;
    height: 0px;
  }
</style>
