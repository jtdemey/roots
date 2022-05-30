<script type="ts">
  import type { Container } from "../../../../models/Container";
	import { ContainerStates } from "$lib/data/items/ContainerStates";
  import CircleQuestionSolid from "$lib/assets/inventory/circle-question-solid.svg";
  import LockOpenSolid from "$lib/assets/inventory/lock-open-solid.svg";
  import LockSolid from "$lib/assets/inventory/lock-solid.svg";
  import AngleDownSolid from "$lib/assets/inventory/angle-down-solid.svg";
  import InventoryListItem from "./InventoryListItem.svelte";

  export let containers: Container[] = [];

  const containerIconInfo: any[] = [
    { alt: "A circled question mark", src: CircleQuestionSolid },
    { alt: "An unlocked padlock", src: LockOpenSolid },
    { alt: "A locked padlock", src: LockSolid },
    { alt: "A downwards-pointing arrow", src: AngleDownSolid }
  ];

	const handleClick = (container: Container) => {
		switch (container.containerState) {
			case ContainerStates.Locked:
			case ContainerStates.Open:
			case ContainerStates.Unknown:
			case ContainerStates.Unlocked:
				break;
		}
	};
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