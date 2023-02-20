<script lang="ts">
	import { onMount } from "svelte";
  import { fly } from "svelte/transition";
	import { parseCombat } from "$lib/parser/CombatParser";
	import { currentEnemy } from "$lib/stores/combat/CombatStore";
	import { registerGameEvents, tick } from "$lib/stores/game/GameStore";

	let inputRef: any;
  let inputValue: string = "";

  const handleKeyDown = (event: any) => {
    if (event.key && event.key === "Enter") {
			const actions = parseCombat(inputValue, $tick, $currentEnemy);
			registerGameEvents(actions);
			inputValue = "";
    }
  };

	onMount(() => inputRef?.focus());
</script>

<input
	bind:this={inputRef}
  bind:value={inputValue}
  in:fly={{
    duration: 800,
    y: 8
  }}
  on:keydown={handleKeyDown}
  autocomplete="off"
  placeholder=">>"
  type="text"
/>

<style>
  input {
    position: absolute;
    bottom: 0;
    left: 0;
    width: calc(100% - 1rem);
    height: 2rem;
    margin: 0;
    padding: 0 0.5rem;
    background-color: hsl(42, 11%, 25%);
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
