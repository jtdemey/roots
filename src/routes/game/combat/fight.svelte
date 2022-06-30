<script type="ts">
  import type { Enemy } from "../../../models/Enemy";
  import type { EnemyMetadata } from "../../../models/EnemyMetadata";
  import type { Locale } from "../../../models/Locale";
  import { goto } from "$app/navigation";
  import { onMount, onDestroy } from "svelte";
  import { tweened } from "svelte/motion";
  import { fade, fly } from "svelte/transition";
  import { GameStates } from "$lib/data/game/GameStates";
  import { GameStateRoutes } from "$lib/data/game/GameStateRoutes";
  import { gameState } from "$lib/stores/game/GameStore";
  import { locale } from "$lib/stores/player/PlayerStore";
  import { getEnemyMetadata } from "$lib/utils/selectors/EnemySelectors";
  import { getLocale } from "$lib/utils/selectors/WorldSelectors";
	import GameClock from "$lib/components/survive/GameClock.svelte";

  let localeName: string = "default_locale";
  let enemy: Enemy;
  let enemyMetadata: EnemyMetadata;
  let enemyName: string = "";
  let currentLocale: Locale;
  
  let unsubEnemies: Function = () => false;
  let unsubLocaleName: Function = () => false;

  unsubLocaleName = locale.subscribe((currentLocaleName: string) => {
    localeName = currentLocaleName;
    currentLocale = getLocale(currentLocaleName);
    unsubEnemies = currentLocale.enemies.subscribe((currentEnemies: Enemy[]) => {
      enemy = currentEnemies[0];
      enemyMetadata = getEnemyMetadata(enemy.name);
      enemyName = enemyMetadata.display;
    });
  });

  onMount(() => {
    if ($gameState !== GameStates.Combat) {
      goto(GameStateRoutes[$gameState]);
    }
  });

  onDestroy(() => {
    unsubEnemies();
    unsubLocaleName();
  });
</script>

<article in:fade={{ duration: 600 }}>
  <section>
    <GameClock darken={true} />
    <h4>{enemyName}</h4>
  </section>
</article>

<style>
  article {
    width: 100%;
    height: 100%;
    background: hsl(42, 46%, 90%);
  }

  section {
    display: grid;
    grid-template-columns: 4fr 5fr;
    width: 100%;
  }

  h4 {
    color: #111;
  }
</style>
