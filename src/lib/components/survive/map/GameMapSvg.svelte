<script lang="ts">
  import type { MapLocale } from "../../../../models/ui/MapLocale";
  import GameMapPath from "./GameMapPath.svelte";

  export let locales: MapLocale[];
</script>

<svg viewBox="0 0 210 297">
  {#each locales as locale}
    <GameMapPath {locale} />
  {/each}
</svg>

<style>
</style>
