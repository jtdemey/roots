<script lang="ts">
  import type { Item } from "../../../../models/Item";
  import type { ItemBtn } from "../../../../models/ui/ItemBtn";
  import { onDestroy } from "svelte";
  import { dropItem, examineItem, items } from "$lib/stores/player/PlayerStore";
  import { ItemData } from "$lib/data/items/ItemData";
  import {
    getItemDisplayName,
    makeItemBtnAction
  } from "$lib/utils/items/ItemUtils";
  import InventoryListItem from "./InventoryListItem.svelte";
  import ItemBtns from "./ItemBtns.svelte";

  export let selectedItemId: string = "";
  export let setSelectedItemId: Function = () => false;

  let inventory: Item[] = [];

  const getItemBtns = (item: Item): ItemBtn[] => {
    const result: ItemBtn[] = [];
    if (!item.name) return result;
    const meta = ItemData[item.name];
    if (meta.description) {
      result.push({
        color: "hsl(210, 18%, 28%)",
        text: "Examine",
        action: makeItemBtnAction(() => examineItem(item), setSelectedItemId)
      });
    }
    result.push({
      color: "hsl(0, 30%, 18%)",
      text: "Drop",
      action: () => dropItem(item)
    });
    return result;
  };

  const handleClick: Function = (entityId: string): void =>
    selectedItemId === entityId
      ? setSelectedItemId("")
      : setSelectedItemId(entityId);

  const unsub = items.subscribe((newItems: Item[]) => {
    inventory = newItems;
  });

  onDestroy(unsub);
</script>

<ul>
  {#each inventory as item, i}
    <InventoryListItem
      animationStagger={i}
      clickFunc={() => handleClick(item.entityId)}
      text={getItemDisplayName(item)}
    />
    {#if selectedItemId === item.entityId}
      <ItemBtns itemBtns={getItemBtns(item)} />
    {/if}
  {/each}
</ul>

<style>
  ul {
    font-family: "DM Sans", sans-serif;
    list-style-type: none;
  }
</style>