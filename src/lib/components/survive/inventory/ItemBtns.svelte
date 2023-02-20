<script lang="ts">
  import type { ItemBtn } from "../../../../models/ui/ItemBtn";
  import { fade } from "svelte/transition";

  export let itemBtns: ItemBtn[];

	const getBtnColor = (itemBtn: ItemBtn) => itemBtn.color || "hsl(48, 4%, 20%)";
</script>

<div class="btn">
  {#each itemBtns as btn, i}
    <div
      in:fade={{
        delay: i * 40,
        duration: 200
      }}
      on:click={() => btn.action()}
			style="background: {getBtnColor(btn)}"
    >
      {btn.text}
    </div>
  {/each}
</div>

<style>
  .btn {
    display: flex;
		margin: 0.15rem 0 0.2rem;
  }

  .btn > div {
		height: 100%;
    background: hsl(48, 4%, 20%);
    margin-left: 0.5rem;
    padding: 0.35rem;
    border-radius: 2px;
		box-shadow: 1px 1px 3px #222;
  }
</style>