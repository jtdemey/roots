<script type="ts">
  import { fly } from "svelte/transition";

	export let alt: string = "A navigation button";
	export let fadeDelay: number = 270;
	export let href: string = "/console";
	export let isActive: boolean = false;
	export let src: any = "$lib/assets/nav/console.svg";
</script>

<div in:fly={{
	delay: fadeDelay,
	duration: 1000,
	y: 8 
}}>
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