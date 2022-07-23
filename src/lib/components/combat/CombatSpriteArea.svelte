<script type="ts">
  import type { Enemy } from "../../../models/Enemy";
  import { fly } from "svelte/transition";
  import CombatSprite from "$lib/components/combat/CombatSprite.svelte";
  import EnemyCombatBars from "./EnemyCombatBars.svelte";
  import PlayerCombatBars from "./PlayerCombatBars.svelte";
  import { enemyAnimation } from "$lib/stores/combat/CombatStore";
  import { onDestroy, onMount } from "svelte";

  export let enemy: Enemy | undefined = undefined;
  export let enemyName: string = "Figure";

  let enemySpriteAnimation: string = "";
  let unsubEnemyAnimation: Function = () => false;

  onMount(() => {
    unsubEnemyAnimation = enemyAnimation.subscribe((currentAnimationKey: string) => {
      enemySpriteAnimation = currentAnimationKey;
    });
  });

  onDestroy(() => {
    unsubEnemyAnimation();
  });
</script>

<section id="sprite-area">
  <div class="stat-area" in:fly={{ duration: 900, x: -100 }}>
    <h3
      in:fly={{
        delay: 100,
        duration: 1400,
        x: -20
      }}
    >
      {enemyName}
    </h3>
    <div
      in:fly={{
        duration: 2400,
        x: -100
      }}
    />
    <EnemyCombatBars currentEnemy={enemy} />
  </div>
  <CombatSprite
    animationName={enemySpriteAnimation}
    flyConfig={{ duration: 600, x: 80 }}
    imgSrc={`/enemies/${enemyName.toLowerCase()}.webp`}
  />
  <CombatSprite
    flyConfig={{ duration: 400, x: -80 }}
    imgSrc={`/survivor.webp`}
  />
  <div class="stat-area" in:fly={{ duration: 600, x: 100 }}>
    <h3
      in:fly={{
        delay: 50,
        duration: 800,
        x: 20
      }}
    >
      Survivor
    </h3>
    <div
      in:fly={{
        duration: 1600,
        x: 100
      }}
    />
    <PlayerCombatBars />
  </div>
</section>

<style>
  #sprite-area {
    display: grid;
    grid-row-gap: 0.5rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    width: 100%;
  }

  h3 {
    padding: 0.2rem 1rem;
    border-bottom: 1px solid hsl(42, 15%, 50%);
    color: hsl(42, 35%, 4%);
    font-size: 1.05rem;
    text-align: right;
  }

  .stat-area > div {
    margin-top: 0.2rem;
  }
</style>
