<script type="ts">
  import type { MapLocale } from "../../../../models/ui/MapLocale";
  import { getLocale } from "$lib/utils/selectors/WorldSelectors";

  const fills = {
    UNVISITED: "",
    IN_PROGRESS: "",
    UNVISITED: "",
    UNVISITED: ""
  };

  const getFill = (localeName: string): string => {
    const locale = getLocale(localeName);
    return "";
  };

  export let locales: MapLocale[] = [];
</script>

<svg viewBox="0 0 210 297">
  {#each locales as locale}
    <path fill="blue" d={locale.path} />
  {/each}
</svg>

<style>
</style>
