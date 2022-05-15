<script type="ts">
	import GameClock from "$lib/components/survive/GameClock.svelte";
</script>

<div>
	<GameClock />
	<slot />
</div>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>