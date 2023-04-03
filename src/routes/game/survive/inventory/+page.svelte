<script type="ts">
  import type { Item } from "../../../../models/Item";
  import type { ItemBtn } from "../../../../models/ui/ItemBtn";
  import type { Locale } from "../../../../models/Locale";
  import { onMount, onDestroy } from "svelte";
  import { fly } from "svelte/transition";
  import { ItemData } from "$lib/data/items/ItemData";
  import { World } from "$lib/data/world/World";
  import { removeExcessLines } from "$lib/stores/game/GameStore";
  import {
    examineItem,
    locale,
    pickUpAllOfItem,
    pickUpItem
  } from "$lib/stores/player/PlayerStore";
  import { consoleHeight } from "$lib/stores/ui/UIStore";
  import { genItemBtn, makeItemBtnAction } from "$lib/utils/items/ItemUtils";
  import ContainerList from "$lib/components/survive/inventory/ContainerList.svelte";
  import LocaleItemList from "$lib/components/survive/inventory/LocaleItemList.svelte";
  import InventoryList from "$lib/components/survive/inventory/InventoryList.svelte";

  let displayName: string = "";
  let localeName: string = "car";
  let selectedItemId: string = "";

  let currentLocale: Locale;
  let unsubDisplayName: Function;
  const unsubLocaleName = locale.subscribe((loc: string) => {
    localeName = loc;
    currentLocale = World.filter((loc: Locale) => loc.name === localeName)[0];
    unsubDisplayName = currentLocale.display.subscribe(
      (display: string) => (displayName = display)
    );
  });

  const setSelectedItemId = (entityId: string) => (selectedItemId = entityId);

  const getItemBtns = (item: Item): ItemBtn[] => {
    const result: ItemBtn[] = [
      genItemBtn(
        "hsl(120, 18%, 22%)",
        "Take",
        makeItemBtnAction(
          () => pickUpItem(item.entityId, localeName),
          setSelectedItemId
        )
      )
    ];

    if (item.amount > 1) {
      result.push(
        genItemBtn(
          "hsl(120, 22%, 26%)",
          "Take all",
          makeItemBtnAction(() => pickUpAllOfItem(item), setSelectedItemId)
        )
      );
    }

    if (!item.name) return result;
    const meta = ItemData[item.name];
    if (meta.description) {
      result.push(
        genItemBtn(
          "hsl(210, 18%, 28%)",
          "Examine",
          makeItemBtnAction(() => examineItem(item), setSelectedItemId)
        )
      )
    }
    return result;
  };

  onMount(() => removeExcessLines(100));

  onDestroy(() => {
    unsubLocaleName();
    unsubDisplayName && unsubDisplayName();
  });
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
    <ContainerList
      {getItemBtns}
      {localeName}
      {selectedItemId}
      {setSelectedItemId}
    />
    <LocaleItemList
      {getItemBtns}
      {localeName}
      {selectedItemId}
      {setSelectedItemId}
    />
    <h3
      in:fly={{
        delay: 60,
        duration: 190,
        y: 8
      }}
    >
      Inventory
    </h3>
    <InventoryList {selectedItemId} {setSelectedItemId} />
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
</style>
