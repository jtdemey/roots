<script type="ts">
  import { gameState } from "../stores/game/GameStore";
  import { GameStates } from "../data/game/GameStates";
</script>

<article>
	<h1>The Roots Run Deep in Caledonia Forest</h1>
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

<style>
	article {
		width: 100%;
		height: 100%;
		background-image: url("$lib/assets/menu/crow.webp");
		background-position: 80% 4rem;
		background-repeat: no-repeat;
		background-size: cover;
	}

	@media (min-width: 836px) {
		article {
			background-position: 50% -12rem;
		}
	}
</style>