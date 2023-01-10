<script type="ts">
  import type { Locale } from "../../../../models/Locale";
  import type { MapLocale } from "../../../../models/ui/MapLocale";
  import { onDestroy, onMount } from "svelte";
  import { GameColors } from "$lib/data/ui/GameColors";
  import { getLocale } from "$lib/utils/selectors/WorldSelectors";
  import { getGameMapFill } from "$lib/utils/world/WorldUtils";

  export let locale: MapLocale;

  let fill: string = GameColors.gameMap.unvisited;
  let isHazardous: boolean = false;
  let localeVisits: number = 0;

  let unsubEnemies: Function = () => {};
  let unsubLocaleVisits: Function = () => {};

  onMount(() => {
    const currentLocale: Locale = getLocale(locale.name);
    unsubEnemies = currentLocale.enemies.subscribe(
      (currentEnemies: Enemy[]) => {
        isHazardous = currentEnemies.length > 0;
      }
    );
    unsubLocaleVisits = currentLocale.visits.subscribe(
      (currentVisits: number) => {
        localeVisits = currentVisits;
      }
    );
  });

  onDestroy(() => {
    unsubEnemies();
    unsubLocaleVisits();
  });

  $: fill = getGameMapFill(isHazardous, localeVisits);
</script>

<path {fill} d={locale.path} />

<style>
</style>
