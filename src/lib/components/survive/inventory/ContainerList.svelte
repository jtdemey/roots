<script type="ts">
	import type { Writable } from "svelte/store";
  import type { Container } from "../../../../models/Container";
	import { onDestroy } from "svelte";
	import { ContainerStates } from "$lib/data/items/ContainerStates";
  import CircleQuestionSolid from "$lib/assets/inventory/circle-question-solid.svg";
  import LockOpenSolid from "$lib/assets/inventory/lock-open-solid.svg";
  import LockSolid from "$lib/assets/inventory/lock-solid.svg";
  import AngleDownSolid from "$lib/assets/inventory/angle-down-solid.svg";
  import InventoryListItem from "./InventoryListItem.svelte";
	import { closeContainer, openContainer } from "$lib/stores/world/WorldStore";
	import { getContainers } from "$lib/utils/selectors/WorldSelectors";
import { getItemMetadata } from "$lib/utils/selectors/ItemSelectors";
import ContainerItemList from "./ContainerItemList.svelte";

	export let localeName: string = "car";

	let containers: Container[] = [];

	const containersStore: Writable<Container[]> = getContainers(localeName);
	const unsub = containersStore.subscribe((c: Container[]) => containers = c);

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
					openContainer(containersStore, id);
				}
				break;
			case ContainerStates.Unlocked:
				openContainer(containersStore, id);
				break;
		}
	};

	const isOpen = (container: Container) => container.containerState === ContainerStates.Open;

	onDestroy(unsub);
</script>

<ul>
  {#each containers as container, i}
    <InventoryListItem
			animationStagger={i}
			color="light-gray"
			clickFunc={() => handleClick(container)}
      text={container.name}
      iconAlt={containerIconInfo[container.containerState].alt}
      iconSrc={containerIconInfo[container.containerState].src}
    />
		{#if isOpen(container)}
			<ContainerItemList containedItems={container.items} />
		{/if}
  {/each}
</ul>

<style>
  ul {
    position: relative;
    top: 0;
    left: 0;
    font-family: "DM Sans", sans-serif;
    list-style-type: none;
  }
</style>