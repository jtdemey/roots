<script lang="ts">
  import type { Item } from "../../../../models/Item";
  import type { Locale } from "../../../../models/Locale";
  import { onDestroy } from "svelte";
	import { getItemDisplayName } from "$lib/utils/items/ItemUtils";
  import { getLocale } from "$lib/utils/selectors/WorldSelectors";
  import InventoryListItem from "./InventoryListItem.svelte";
  import ItemBtns from "./ItemBtns.svelte";

  export let containerId: string = "";
	export let getItemBtns: Function = () => [];
  export let localeName: string = "car";
  export let selectedItemId: string = "";
  export let setSelectedItemId: Function = () => false;

  let currentLocale: Locale;
  let items: Item[] = [];
  let unsubItems: Function = () => false;

  $: {
    currentLocale = getLocale(localeName);
    unsubItems = currentLocale.items.subscribe(
      (localeItems: Item[]) =>
        (items = localeItems.filter(
          (stuff: Item) => stuff.containerId === containerId
        ))
    );
  }

  const handleClick: Function = (entityId: string): void =>
    selectedItemId === entityId
      ? setSelectedItemId("")
      : setSelectedItemId(entityId);

  onDestroy(unsubItems);
</script>

<div>
  {#each items as item, i}
    <InventoryListItem
      animationStagger={i}
      clickFunc={() => handleClick(item.entityId)}
      text={getItemDisplayName(item)}
    />
    {#if selectedItemId === item.entityId}
      <ItemBtns itemBtns={getItemBtns(item)} />
    {/if}
  {/each}
</div>

<style>
  div {
    padding-left: 0.75rem;
  }
</style>
