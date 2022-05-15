<script type="ts">
	import { onMount } from "svelte";
	import { paused } from "$lib/stores/game/GameStore";

	onMount(() => {
		if ($paused) {
			$paused = false;
		}
	});
</script>

<section>
	hi
</section>

<style>
	section {
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>