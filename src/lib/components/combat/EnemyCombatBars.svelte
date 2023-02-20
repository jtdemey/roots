<script lang="ts">
  import type { Enemy } from "../../../models/Enemy";
  import { onMount, onDestroy } from "svelte";
  import { linear } from "svelte/easing";
  import { tweened, type Tweened } from "svelte/motion";
  import { GameColors } from "$lib/data/ui/GameColors";
  import { enemyCooldown } from "$lib/stores/combat/CombatStore";
  import { roundTo } from "$lib/utils/MathUtils";
  import CombatBar from "$lib/components/combat/CombatBar.svelte";

  export let currentEnemy: Enemy | undefined = undefined;

  let enemyCd: number = 0;
  let enemyHp: number = 50;
  let enemyMaxHp: number = 50;
  let unsubEnemyCd: Function = () => false;
  let unsubEnemyHp: Function = () => false;
  let unsubEnemyMaxHp: Function = () => false;

  const cdLabelValue: Tweened<number> = tweened(100, {
    duration: 420,
    easing: linear
  });

  onMount(() => {
    if (!currentEnemy) return;
    unsubEnemyCd = enemyCooldown.subscribe((currentCd: number) => {
      enemyCd = currentCd;
      cdLabelValue.set(currentCd, { duration: 1 });
      setTimeout(() => {
        cdLabelValue.set(0, { duration: (currentCd - 1) * 500 - 5 });
      }, 5);
    });
    unsubEnemyHp = currentEnemy.health.subscribe((currentHp: number) => {
      enemyHp = currentHp;
    });
    unsubEnemyMaxHp = currentEnemy.maxHealth.subscribe(
      (currentMaxHp: number) => {
        enemyMaxHp = currentMaxHp;
      }
    );
  });

  onDestroy(() => {
    unsubEnemyCd();
    unsubEnemyHp();
    unsubEnemyMaxHp();
  });
</script>

<div>
  <CombatBar
    backgroundColor={GameColors.combat.health}
    label="HP"
    middleFillColor="yellow"
    text={enemyHp.toString()}
    width={(enemyHp / enemyMaxHp) * 100}
  />
  <CombatBar
    backgroundColor={GameColors.combat.cooldown}
    isReplenishing={true}
    label="CD"
    text={roundTo($cdLabelValue, 1).toString()}
    width={enemyCd === 0 ? 100 : enemyCd}
  />
</div>
