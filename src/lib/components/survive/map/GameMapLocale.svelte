<script type="ts">
  import type { ILocaleProgressionStatus } from "$lib/data/world/LocaleProgressionStatuses";

  const WIDTH: number = 180;

  export let path: string;
  export let progressionStatus: ILocaleProgressionStatus;
  export let scale: number = 1;
  export let x: number = 0;
  export let y: number = 0;
  export let zIndex: number = 0;
</script>

<div
  style="top: {y}px; left: {x}px; width: {WIDTH *
    scale}; transform: scale({scale}); z-index: {zIndex};"
>
  <svg
    fill={progressionStatus.color}
    stroke="hsl(120, 3%, 40%)"
    stroke-width={4 / (scale / 2)}
    viewBox="0 0 210 297"
    width="auto"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path on:click={() => console.log("sploot" + scale)} d={path} />
  </svg>
</div>

<style>
  div {
    position: absolute;
  }

  svg {
    width: 40%;
    height: 40%;
  }
</style>
