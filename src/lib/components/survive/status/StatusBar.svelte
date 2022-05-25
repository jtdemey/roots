<script type="ts">
	import GameClock from "../GameClock.svelte";
	import TemperatureStatus from "./TemperatureStatus.svelte";
</script>

<section>
	<GameClock />
	<TemperatureStatus />
</section>

<style>
	section {
		width: 100%;
		height: 40px;
		display: grid;
		color: #fff;
		grid-template-columns: 3fr 0.75fr 1.5fr 0.5fr;
	}
</style>