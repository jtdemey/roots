<script type="ts">
  import { fly } from "svelte/transition";
	import { formatTime } from "$lib/utils/DateUtils";
	import { tick } from "$lib/stores/game/GameStore";

	const getTimeFromTick = (tick: number): string => {
		const s = new Date(1987, 11, 12, 9, 44, 8, 0);
		s.setSeconds((1 * s.getSeconds()) + Math.floor(tick / 2));
		return s.toString();
	};
</script>

<div>
	<span in:fly={{
    duration: 2000,
    y: -6 
  }}>
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