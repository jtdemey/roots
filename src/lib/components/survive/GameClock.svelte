<script type="ts">
	import { formatTime } from "$lib/utils/DateUtils";
	import { tick } from "$lib/stores/game/GameStore";

	const getTimeFromTick = (tick: number): string => {
		const s = new Date(1987, 11, 12, 9, 44, 8, 0);
		s.setSeconds((1 * s.getSeconds()) + Math.floor(tick / 2));
		return s.toString();
	};
</script>

<div>
  {formatTime(getTimeFromTick($tick))}
</div>

<style>

</style>