<script type="ts">
	import type { GameEvent } from "../../models/GameEvent";
	import { gameEvents, gameState, paused, tick } from "../../stores/game/GameStore";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	onMount(() => {
		if ($gameState < 1) goto("/mainmenu");
		const clock = setInterval(() => {
			if ($paused) return;
			$tick += 1;
			console.log($tick);
			if ($gameEvents.length < 1) return;
			$gameEvents.forEach((event: GameEvent) => {
				console.log(event)
			});
		}, 500);
		return () => clearInterval(clock);
	});
</script>

<div>
	<slot />
</div>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>