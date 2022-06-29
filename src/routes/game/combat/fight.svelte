<script type="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { fade, fly } from "svelte/transition";
	import GameClock from "$lib/components/survive/GameClock.svelte";
</script>

<article in:fade={{ duration: 600 }}>
  <GameClock />
</article>

<style>
  article {
    width: 100%;
    height: 100%;
    background: hsl(42, 46%, 90%);
  }
</style>
