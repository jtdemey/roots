<script type="ts">
  import type { Enemy } from "../../../../models/Enemy";
  import type { EnemyMetadata } from "../../../../models/meta/EnemyMetadata";
  import type { Locale } from "../../../../models/Locale";
  import { goto } from "$app/navigation";
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { GameStates } from "$lib/data/game/GameStates";
  import { GameStateRoutes } from "$lib/data/game/GameStateRoutes";
  import { gameState } from "$lib/stores/game/GameStore";
  import { locale } from "$lib/stores/player/PlayerStore";
  import { getEnemyMetadata } from "$lib/utils/selectors/EnemySelectors";
  import { getLocale } from "$lib/utils/selectors/WorldSelectors";
  import CombatInput from "$lib/components/combat/CombatInput.svelte";
  import CombatSpriteArea from "$lib/components/combat/CombatSpriteArea.svelte";
  import CombatText from "$lib/components/combat/CombatText.svelte";
  import GameClock from "$lib/components/survive/GameClock.svelte";
  import CombatOverlay from "$lib/components/combat/CombatOverlay.svelte";

  let currentLocale: Locale;
  let enemy: Enemy;
  let enemyMetadata: EnemyMetadata;
  let enemyName: string = "Figure";
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

<CombatOverlay>
  <article in:fade={{ duration: 600 }}>
    <section id="top-bar">
      <GameClock darken={true} />
      <h5>{localeDisplay}</h5>
    </section>
    <CombatSpriteArea {enemy} {enemyName} />
    <CombatText />
    <CombatInput />
  </article>
</CombatOverlay>

<style>
  article {
    position: fixed;
    top: 0;
    left: 0;
    display: grid;
    grid-template-rows: calc(40px + 1rem) 5fr 4fr 2rem;
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
    margin: auto 2rem auto 0;
    color: hsl(42, 35%, 4%);
    text-align: right;
  }
</style>
