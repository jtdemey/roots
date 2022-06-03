<script type="ts">
  import type { Item } from "../../../../models/Item";
  import { items } from "$lib/stores/player/PlayerStore";
  import { getItemMetadata } from "$lib/utils/selectors/ItemSelectors";
  import InventoryListItem from "./InventoryListItem.svelte";
  import ItemBtns from "./ItemBtns.svelte";

	export let selectedItemId: string = "";
	export let setSelectedItemId: Function = () => false;

  const inventory: Item[] = $items;

  const handleClick: Function = (entityId: string): void =>
    selectedItemId === entityId
      ? setSelectedItemId("")
      : setSelectedItemId(entityId);
</script>

<ul>
  {#each inventory as item, i}
    <InventoryListItem
      animationStagger={i}
      clickFunc={() => handleClick(item.entityId)}
      text={getItemMetadata(item.name).display}
    />
    {#if selectedItemId === item.entityId}
      <ItemBtns {item} />
    {/if}
  {/each}
</ul>

<style>
  ul {
    font-family: "DM Sans", sans-serif;
    list-style-type: none;
  }
</style>