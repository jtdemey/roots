<script type="ts">
  import type { Item } from "../../../../models/Item";
  import { onDestroy } from "svelte";
  import InventoryListItem from "./InventoryListItem.svelte";
  import { getItemMetadata } from "$lib/utils/selectors/ItemSelectors";
  import { getLocale } from "$lib/utils/selectors/WorldSelectors";

  export let containerId: string = "";
  export let localeName: string = "car";
	export let selectedItemId: string = "";
	export let setSelectedItemId: Function = () => false;

  let items: Item[] = [];

  const currentLocale = getLocale(localeName);
  const unsub = currentLocale.items.subscribe(
    (localeItems: Item[]) =>
      (items = localeItems.filter(
        (stuff: Item) => stuff.containerId === containerId
      ))
  );

  const handleClick: Function = (entityId: string): void =>
    selectedItemId === entityId
      ? setSelectedItemId("")
      : setSelectedItemId(entityId);

  onDestroy(unsub);
</script>

<div>
  {#each items as item, i}
    <InventoryListItem
      animationStagger={i}
			clickFunc={() => handleClick(item.entityId)}
      text={getItemMetadata(item.name).display}
    />
  {/each}
</div>

<style>
  div {
    padding-left: 0.75rem;
  }
</style>