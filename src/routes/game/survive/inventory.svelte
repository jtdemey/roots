<script type="ts">
  import { fly } from "svelte/transition";
  import { items, locale } from "$lib/stores/player/PlayerStore";
  import { consoleHeight } from "$lib/stores/ui/UIStore";
	import { gameWorld } from "$lib/stores/world/WorldStore";
  import { getItemMetadata } from "$lib/utils/selectors/ItemSelectors";
  import type { Item } from "../../../models/Item";
  import type { ItemMetadata } from "../../../models/meta/ItemMetadata";
  import type { Locale } from "../../../models/Locale";
  import type { Container } from "../../../models/Container";
  import ContainerList from "$lib/components/survive/inventory/ContainerList.svelte";
  import InventoryListItem from "$lib/components/survive/inventory/InventoryListItem.svelte";

  const currentLocale: Locale = $gameWorld.filter((loc: Locale) => loc.name === $locale)[0];

  const containers: Container[] = currentLocale.containers;
  const hasContainers: boolean = containers.length > 0;

  const localeItems: Item[] = currentLocale.items;
  const localeItemData: ItemMetadata[] = localeItems.map((item: Item) =>
    getItemMetadata(item.name)
  );

  const playerItemData = $items.map((item: Item) => getItemMetadata(item.name));
</script>

<section style="max-height: {$consoleHeight}px">
  <div>
    <h3
      in:fly={{
        duration: 190,
        y: 8
      }}
    >
      {currentLocale.display}
    </h3>
    {#if hasContainers}
      <ContainerList {containers} />
    {/if}
    <ul class="m-b">
      {#if localeItemData}
        {#each localeItemData as localeItem, i}
          <InventoryListItem
            animationStagger={containers.length + (i + 1)}
            text={localeItem.display}
          />
        {/each}
      {/if}
    </ul>
    <h3
      in:fly={{
        delay: 60,
        duration: 190,
        y: 8
      }}
    >
      Inventory
    </h3>
    <ul class="m-b">
      {#if playerItemData}
        {#each playerItemData as playerItem, i}
          <InventoryListItem
            animationStagger={containers.length +
              localeItemData.length +
              (i + 1)}
            text={playerItem.display}
          />
        {/each}
      {/if}
    </ul>
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
    position: relative;
    top: 0;
    left: 0;
    font-family: "DM Sans", sans-serif;
    list-style-type: none;
  }

  .m-b {
    margin-bottom: 1rem;
  }
</style>