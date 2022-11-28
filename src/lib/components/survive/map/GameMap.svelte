<script type="ts">
  import type { MapImage } from "src/models/ui/MapImage";
  import { MapImages } from "$lib/data/world/MapImages";
  import GameMapLocale from "./GameMapLocale.svelte";

  const mapImgs: MapImage[] = Object.keys(MapImages).map(
    (imgName: string) => MapImages[imgName]
  );
</script>

<div>
  {#each mapImgs as mapImg}
    <GameMapLocale path={mapImg.path} />
  {/each}
</div>

<style>
  div {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
