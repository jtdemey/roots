<script type="ts">
	import StatusBar from "$lib/components/survive/status/StatusBar.svelte";
</script>

<div>
	<StatusBar />
	<slot />
</div>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>