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

  export let currentEnemy: Enemy;

  const attackPlayer = (): void => {
    const nextMove: Move = getNextMove(currentEnemy);
    const queueEvent = (action: Function): void =>
      registerGameEvent(genGameEvent($tick, () => action()));
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
        registerGameEvent(genGameEvent($tick + nextMove.cooldown, effects[1]));
      });
    }
    queueEvent(() => setEnemyAnimation(nextMove.animation));
    queueEvent(() => setEnemyCooldown(nextMove.cooldown));
    registerGameEvent(genGameEvent($tick + nextMove.cooldown, () => setEnemyCooldown(0)));
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
