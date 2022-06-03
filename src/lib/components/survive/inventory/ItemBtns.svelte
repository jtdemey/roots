<script type="ts">
	import type { Item } from "../../../../models/Item";
  import { fly } from "svelte/transition";
	import { ItemData } from "$lib/data/items/ItemData";

	interface ItemBtn {
		text: string;
		action: Function;
	}

	export let item: Item;

	const getItemBtns = (): ItemBtn[] => {
		const result: ItemBtn[] = [{ text: "Drop", action: () => false }];
		if (!item.name) return result;
		const meta = ItemData[item.name];
		if (meta.description) {
			result.push({ text: "Examine", action: () => false });
		}
		if (meta.equipable) {
			result.push({ text: "Equip", action: () => false });
		}
		return result;
	};

	const itemBtns = getItemBtns();
</script>

<div>
	{#each itemBtns as btn, i}
		<div in:fly={{
			delay: i * 40
		}} on:click={() => btn.action()}>{btn.text}</div>
	{/each}
</div>

<style>
	div {
		display: flex;
	}

	div > div {
		padding: 0.25rem 1rem;
	}
</style>