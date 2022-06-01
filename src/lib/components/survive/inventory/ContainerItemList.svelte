<script type="ts">
	import type { Item } from "../../../../models/Item";
	import type { Writable } from "svelte/store";
	import InventoryListItem from "./InventoryListItem.svelte";
	import { getItemMetadata } from "$lib/utils/selectors/ItemSelectors";

	export let containedItems: Writable<Item[]>;

	const items = $containedItems;
</script>

<div>
	{#each items as item, i}
		<InventoryListItem
			animationStagger={i}
			text={getItemMetadata(item.name).display}
		/>
	{/each}
</div>

<style>
	div {
		padding-left: 0.5rem;
	}
</style>