<script lang="ts">
  import { fly } from "svelte/transition";
	import { formatTime, getTimeFromTick } from "$lib/utils/DateUtils";
	import { tick } from "$lib/stores/game/GameStore";

  export let darken: boolean = false;
</script>

<div style="color:{darken ? "#111" : "#fff"}">
  <span
    in:fly={{
      duration: 2000,
      y: -6 
    }} 
  >
		{formatTime(getTimeFromTick($tick))}
	</span>
</div>

<style>
	div {
		width: 100%;
		height: 40px;
		display: flex;
		align-items: center;
	}

	span {
		padding-left: 1rem;
		font-family: 'DM Serif Display', serif;
		font-size: 1.1rem;
	}
</style>
