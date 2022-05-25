<script type="ts">
	import NavBar from "$lib/components/survive/nav/NavBar.svelte";
	import StatusBar from "$lib/components/survive/status/StatusBar.svelte";
</script>

<div>
	<StatusBar />
	<slot />
	<NavBar />
</div>

<style>
	div {
		width: 100%;
		min-height: 100%;
	}
</style>