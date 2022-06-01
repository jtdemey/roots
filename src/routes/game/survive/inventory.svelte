<script type="ts">
  import type { Locale } from "../../../models/Locale";
	import { onDestroy } from "svelte";
  import { fly } from "svelte/transition";
  import { locale } from "$lib/stores/player/PlayerStore";
  import { consoleHeight } from "$lib/stores/ui/UIStore";
	import { World } from "$lib/data/world/World";
  import ContainerList from "$lib/components/survive/inventory/ContainerList.svelte";

	let displayName: string = "";
	const localeName: string = $locale;

  const currentLocale: Locale = World.filter((loc: Locale) => loc.name === $locale)[0];
	const unsub = currentLocale.display.subscribe((display: string) => displayName = display);

	onDestroy(unsub);
</script>

<section style="max-height: {$consoleHeight}px">
  <div>
    <h3
      in:fly={{
        duration: 190,
        y: 8
      }}
    >
      {displayName}
    </h3>
		<ContainerList localeName={localeName} />
    <h3
      in:fly={{
        delay: 60,
        duration: 190,
        y: 8
      }}
    >
      Inventory
    </h3>
  </div>
</section>

<style>
  section {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  section > div {
    margin: 1rem;
  }

  h3 {
    margin: 0.5rem 0.15rem;
    font-size: 1.5rem;
  }

  ul {
    font-family: "DM Sans", sans-serif;
    list-style-type: none;
  }

  .m-b {
    margin-bottom: 1rem;
  }
</style>