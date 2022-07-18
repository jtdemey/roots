<script type="ts">
  import type { Enemy } from "../../../models/Enemy";
  import { GameColors } from "$lib/data/ui/GameColors";
  import CombatBar from "$lib/components/combat/CombatBar.svelte";
  import CombatSprite from "$lib/components/combat/CombatSprite.svelte";
  import EnemyCombatBars from "./EnemyCombatBars.svelte";

  export let enemy: Enemy | undefined = undefined;
  export let enemyName: string = "Figure";
</script>

<section id="sprite-area">
  <div class="stat-area">
    <h3>{enemyName}</h3>
    <div></div>
    <EnemyCombatBars currentEnemy={enemy} />
  </div>
  <CombatSprite imgSrc={`/enemies/${enemyName}.webp`} />
  <CombatSprite imgSrc={`/survivor.webp`} />
  <div class="stat-area">
    <h3>Survivor</h3>
    <div></div>
    <CombatBar backgroundColor={GameColors.combat.health} label="HP" />
    <CombatBar backgroundColor={GameColors.combat.cooldown} label="CD" />
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
