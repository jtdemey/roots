<script type="ts">
  import { fly } from "svelte/transition";
  import { temperature } from "$lib/stores/player/PlayerStore";
  import { usingFahrenheit } from "$lib/stores/settings/SettingsStore";
</script>

<div in:fly={{
	delay: 90,
	duration: 2000,
	y: -6 
}}>
  {$temperature}
  <span>&deg;</span>
  {usingFahrenheit ? "F" : "C"}
</div>

<style>
  div {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    font-family: "DM Serif Display", serif;
    font-size: 1.1rem;
    padding-right: 0.2rem;
    justify-content: center;
    text-align: center;
    margin-right: 0.25rem;
  }
</style>