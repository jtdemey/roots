<script type="ts">
	import "../styles/base.css";
  import { GameColors } from "$lib/data/ui/GameColors";
</script>

<main style="background-color: {GameColors.grayscales.green[0]}">
	<slot />
</main>

<style>
	/*
	$black-bean: #460c0cff;
	$up-maroon: #7d0013ff;
	$bittersweet-shimmer: #b4575cff;
	$deep-taupe: #81676bff;
	$dim-gray: #706c6fff;
	$black-coffee: #443c41ff;
	*/

	main {
		width: 100%;
		height: 100%;
    background: hsl(48, 38%, 3%);
		color: #f5f5f5;
	}
</style>
