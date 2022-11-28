<script type="ts">
  import { onMount } from "svelte";
  import { removeExcessLines } from "$lib/stores/game/GameStore";
  import GameMap from "$lib/components/survive/map/GameMap.svelte";

  onMount(() => {
    removeExcessLines(100);
  });
</script>

<section>
  <GameMap />
</section>

<style>
  section {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
