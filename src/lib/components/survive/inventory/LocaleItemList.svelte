<script type="ts">
  import type { Item } from "../../../../models/Item";
  import type { Writable } from "svelte/store";
  import { onDestroy } from "svelte";
	import { getItemDisplayName } from "$lib/utils/items/ItemUtils";
  import { getLocaleItems } from "$lib/utils/selectors/WorldSelectors";
  import InventoryListItem from "./InventoryListItem.svelte";
	import ItemBtns from "./ItemBtns.svelte";

	export let getItemBtns: Function = () => [];
  export let localeName: string = "car";
  export let selectedItemId: string = "";
  export let setSelectedItemId: Function = () => false;

  let localeItems: Item[] = [];

  const localeItemsStore: Writable<Item[]> = getLocaleItems(localeName);
  const unsub = localeItemsStore.subscribe(
    (items: Item[]) =>
      (localeItems = items.filter((stuff: Item) => stuff.containerId === null))
  );

  const handleClick: Function = (entityId: string): void =>
    selectedItemId === entityId
      ? setSelectedItemId("")
      : setSelectedItemId(entityId);

  onDestroy(unsub);
</script>

<ul>
  {#each localeItems as localeItem, i}
    <InventoryListItem
      animationStagger={i}
			clickFunc={() => handleClick(localeItem.entityId)}
      text={getItemDisplayName(localeItem)}
    />
    {#if selectedItemId === localeItem.entityId}
      <ItemBtns itemBtns={getItemBtns(localeItem)} />
    {/if}
  {/each}
</ul>

<style>
  ul {
    font-family: "DM Sans", sans-serif;
    list-style-type: none;
    margin-top: 3px;
  }
</style>