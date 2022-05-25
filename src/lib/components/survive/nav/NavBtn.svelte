<script type="ts">
	export let alt = "A navigation button";
	export let href = "/console";
	export let isActive = false;
	export let src = "$lib/assets/nav/console.svg";
</script>

<div>
	<a href={href}>
		<img alt={alt} class={isActive ? "active" : ""} src={src} />
	</a>
</div>

<style>
	div {
		height: 100%;
		display: flex;
		align-content: center;
		align-items: center;
		text-align: center;
	}

	div > a {
		margin: auto;
	}

	div > a > img {
		width: 64px;
		height: 64px;
	}

	.active {
		filter: invert(87%) sepia(0%) saturate(0%) hue-rotate(155deg) brightness(83%) contrast(94%);
	}
</style>