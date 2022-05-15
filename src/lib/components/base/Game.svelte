<script type="ts">
	import type { GameEvent } from "../../../models/GameEvent";
	import { onMount } from "svelte";
	import { gameEvents, gameState, paused, tick } from "$lib/stores/game/GameStore";
	import { goto } from "$app/navigation";

	onMount(() => {
		if ($gameState < 1) goto("/mainmenu");
		const clock = setInterval(() => {
			if ($paused) return;
			$tick += 1;
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
		font-family: 'DM Serif Display', serif;
	}
</style>