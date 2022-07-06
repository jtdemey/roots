<script type="ts">
  import type { Writable } from "svelte/store";
  import type { Container } from "../../../../models/Container";
  import { onDestroy } from "svelte";
  import { ContainerStates } from "$lib/data/items/ContainerStates";
  import { GameColors } from "$lib/data/ui/GameColors";
  import CircleQuestionSolid from "$lib/assets/inventory/circle-question-solid.svg";
  import LockOpenSolid from "$lib/assets/inventory/lock-open-solid.svg";
  import LockSolid from "$lib/assets/inventory/lock-solid.svg";
  import AngleDownSolid from "$lib/assets/inventory/angle-down-solid.svg";
  import ContainerItemList from "./ContainerItemList.svelte";
  import InventoryListItem from "./InventoryListItem.svelte";
  import { closeContainer, openContainer } from "$lib/stores/world/WorldStore";
  import { getContainers } from "$lib/utils/selectors/WorldSelectors";
  import { sortObjectsByPropName } from "$lib/utils/SortUtils";

	export let getItemBtns: Function = () => [];
  export let localeName: string = "car";
  export let selectedItemId: string = "";
  export let setSelectedItemId: Function = () => false;

  let containers: Container[] = [];
  let containersStore: Writable<Container[]>;
  let unsubContainers: Function;

  $: {
    containersStore = getContainers(localeName);
    unsubContainers = containersStore.subscribe((c: Container[]) => {
      const newContainers = sortObjectsByPropName(c, "name");
      containers = c.sort(
        (containerA: Container, containerB: Container) => containerB.name[0] - containerA.name[0]
      )
    });
  }

  const containerIconInfo: any[] = [
    { alt: "A circled question mark", src: CircleQuestionSolid },
    { alt: "An unlocked padlock", src: LockOpenSolid },
    { alt: "A locked padlock", src: LockSolid },
    { alt: "A downwards-pointing arrow", src: AngleDownSolid }
  ];

  const handleClick = (container: Container) => {
    const id = container.entityId;
    switch (container.containerState) {
      case ContainerStates.Locked:
      case ContainerStates.Open:
        closeContainer(containersStore, id);
        break;
      case ContainerStates.Unknown:
        if (container.locked === false) {
          openContainer(containersStore, id, localeName);
        }
        break;
      case ContainerStates.Unlocked:
        openContainer(containersStore, id, localeName);
        break;
    }
  };

  const isOpen = (container: Container) =>
    container.containerState === ContainerStates.Open;

  onDestroy(() => unsubContainers && unsubContainers());
</script>

<ul>
  {#each containers as container, i}
    <InventoryListItem
      animationStagger={i}
      color={GameColors.grayscales.green[3]}
      clickFunc={() => handleClick(container)}
      text={container.name}
      iconAlt={containerIconInfo[container.containerState].alt}
      iconSrc={containerIconInfo[container.containerState].src}
    />
    {#if isOpen(container)}
      <ContainerItemList
        containerId={container.entityId}
				{getItemBtns}
        {localeName}
        {selectedItemId}
        {setSelectedItemId}
      />
    {/if}
  {/each}
</ul>

<style>
  ul {
    font-family: "DM Sans", sans-serif;
    list-style-type: none;
  }
</style>
