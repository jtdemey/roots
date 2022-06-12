<script script type="ts">
	import { onMount } from "svelte";
	import { GameStates } from "$lib/data/game/GameStates";
  import { gameState } from "$lib/stores/game/GameStore";
	import { consoleHeight, isConsoleHeightSet } from "$lib/stores/ui/UIStore";

	let menuContainer: any = undefined;

	onMount(() => {
		if (menuContainer) {
			if ($isConsoleHeightSet === false) {
				$consoleHeight = menuContainer.clientHeight - 106;
				$isConsoleHeightSet = true;
			}
		}
	});
</script>

<div bind:this={menuContainer}>
	<article>
		<h1>The Devil's<br />Fingers</h1>
		<section>
			<ul>
				<a
					href="/attempt"
					on:click={() => {
						$gameState = GameStates.Cinematic;
					}}
				>
					<li>Attempt</li>
				</a>
				<a href="/">
					<li>Load Game</li>
				</a>
				<a href="/options">
					<li>Options</li>
				</a>
			</ul>
		</section>
	</article>
</div>

<style>
	div {
		width: 100%;
		height: 100%;
		background-image: linear-gradient(hsl(48, 38%, 3%), #364449);
	}

	article {
		width: 100%;
		height: 100%;
		background-image: url("$lib/assets/menu/crow.webp");
		background-position: 80% 4rem;
		background-repeat: no-repeat;
		background-size: cover;
	}

	h1 {
		margin: 0;
		padding: 3rem;
		color: #f5f5f5;
		font-family: 'DM Serif Display', serif;
		font-size: 2.5rem;
		opacity: 1;
	}

	section {
		position: absolute;
		bottom: 0;
		right: 0;
		list-style-type: none;
		text-align: right;
		padding: 4rem 2rem;
	}

	li {
		padding: 0.5rem 1rem;
		opacity: 1.0;
		color: #f5f5f5;
		font-family: 'DM Sans', sans-serif;
		font-size: 1.5rem;
		text-shadow: 2px 2px 4px hsl(48, 38%, 3%);
	}

	ul > a:first-child > li {
		color: #7d0013;
	}

	@media (min-width: 836px) {
		article {
			background-position: 50% -12rem;
		}
	}
</style>