<script type="ts">
  import type { Enemy } from "../../../models/Enemy";
  import type { EnemyMetadata } from "../../../models/meta/EnemyMetadata";
  import type { Locale } from "../../../models/Locale";
  import { goto } from "$app/navigation";
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { GameColors } from "$lib/data/ui/GameColors";
  import { GameStates } from "$lib/data/game/GameStates";
  import { GameStateRoutes } from "$lib/data/game/GameStateRoutes";
  import { gameState } from "$lib/stores/game/GameStore";
  import { locale } from "$lib/stores/player/PlayerStore";
  import { getEnemyMetadata } from "$lib/utils/selectors/EnemySelectors";
  import { getLocale } from "$lib/utils/selectors/WorldSelectors";
  import GameClock from "$lib/components/survive/GameClock.svelte";
  import CombatBar from "$lib/components/combat/CombatBar.svelte";
  import CombatSprite from "$lib/components/combat/CombatSprite.svelte";

  let currentLocale: Locale;
  let enemy: Enemy;
  let enemyMetadata: EnemyMetadata;
  let enemyName: string = "placeholder";
  let localeDisplay: string = "";

  let unsubEnemies: Function = () => false;
  let unsubLocaleName: Function = () => false;
  let unsubLocaleDisplay: Function = () => false;

  unsubLocaleName = locale.subscribe((currentLocaleName: string) => {
    currentLocale = getLocale(currentLocaleName);
    unsubLocaleDisplay = currentLocale.display.subscribe((currentDisplay: string) => {
      localeDisplay = currentDisplay;
    });
    unsubEnemies = currentLocale.enemies.subscribe(
      (currentEnemies: Enemy[]) => {
        enemy = currentEnemies[0];
        if (enemy) {
          enemyMetadata = getEnemyMetadata(enemy.name);
          enemyName = enemyMetadata.display;
        }
      }
    );
  });

  onMount(() => {
    if ($gameState !== GameStates.Combat) {
      goto(GameStateRoutes[$gameState]);
    }
  });

  onDestroy(() => {
    unsubEnemies();
    unsubLocaleName();
    unsubLocaleDisplay();
  });
</script>

<article in:fade={{ duration: 600 }}>
  <section id="top-bar">
    <GameClock darken={true} />
    <h5>{localeDisplay}</h5>
  </section>
  <section id="sprite-area">
    <div class="stat-area">
      <h3>{enemyName}</h3>
      <div></div>
      <CombatBar backgroundColor={GameColors.combat.health} label="HP" width={40} />
      <CombatBar backgroundColor={GameColors.combat.cooldown} label="CD" />
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
</article>

<style>
  article {
    width: 100%;
    height: 100%;
    background: hsl(42, 46%, 90%);
  }

  #top-bar {
    display: grid;
    grid-template-columns: 4fr 5fr;
    width: 100%;
    margin-bottom: 1rem;
  }
  
  h5 {
    margin: auto 0;
    color: hsl(42, 35%, 4%);
  }
  
  h3 {
    padding: 0.2rem 1rem;
    border-bottom: 1px solid hsl(42, 15%, 50%);
    color: hsl(42, 35%, 4%);
    font-size: 1.05rem;
    text-align: right;
  }

  #sprite-area {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    width: 100%;
  }

  .stat-area > div {
    margin-top: 0.2rem;
  }
</style>
