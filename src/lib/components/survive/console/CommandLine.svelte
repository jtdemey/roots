<script type="ts">
	import { onMount } from "svelte";
	import { parseInput } from "$lib/parser/ExploreParser";
	import { registerGameEvents, tick } from "$lib/stores/game/GameStore";

	let inputRef: any;
  let inputValue: string = "";

  const handleKeyDown = (event: any) => {
    if (event.key && event.key === "Enter") {
			const actions = parseInput(inputValue, $tick);
			registerGameEvents(actions);
    }
  };

	onMount(() => inputRef?.focus());
</script>

<input
	bind:this={inputRef}
  bind:value={inputValue}
  on:keydown={handleKeyDown}
  placeholder=">>"
  type="text"
/>

<style>
  input {
    position: absolute;
    bottom: 0px;
    width: calc(100% - 1rem);
    height: 2rem;
    margin: 0;
    padding: 0 0.5rem;
    background-color: hsl(320, 2%, 25%);
    border: none;
    background-image: none;
    box-shadow: none;
    color: #f5f5f5;
    font-family: "DM Sans", sans-serif;
    font-size: 1rem;
  }

  input:focus {
    outline: none;
  }
</style>