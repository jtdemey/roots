<script type="ts">
  import { onMount } from "svelte";
  import { removeExcessLines } from "$lib/stores/game/GameStore";
  import MapCanvas from "$lib/components/survive/map/MapCanvas.svelte";

  onMount(() => {
    removeExcessLines(100);
  });
</script>

<section id="game-map">
  <MapCanvas />
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
