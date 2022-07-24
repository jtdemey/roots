<script type="ts">
  import type { Enemy } from "../../../models/Enemy";
  import { onMount, onDestroy } from "svelte";
  import { GameColors } from "$lib/data/ui/GameColors";
  import CombatBar from "$lib/components/combat/CombatBar.svelte";

  export let currentEnemy: Enemy | undefined = undefined;

  let enemyHp: number = 50;
  let enemyMaxHp: number = 50;
  let unsubEnemyHp: Function = () => false;
  let unsubEnemyMaxHp: Function = () => false;

  onMount(() => {
    if (currentEnemy !== undefined) {
      unsubEnemyHp = currentEnemy.health.subscribe((currentHp: number) => {
        enemyHp = currentHp;
      });
      unsubEnemyMaxHp = currentEnemy.maxHealth.subscribe(
        (currentMaxHp: number) => {
          enemyMaxHp = currentMaxHp;
        }
      );
    }
  });

  onDestroy(() => {
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
    width={enemyHp / enemyMaxHp * 100}
  />
  <CombatBar backgroundColor={GameColors.combat.cooldown} label="CD" />
</div>
