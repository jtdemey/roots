<script type="ts">
  export let opacity: number = 1.0;
	export let text: string = "...";
</script>

<pre style="opacity: {opacity};">
	{text}
</pre>

<style>
	pre {
		min-height: 27px;
		margin: 0;
		padding: 0 0.5rem;
		font-family: 'Newsreader', serif;
		font-size: 1rem;
		line-height: 150%;
		white-space: inherit;
	}
</style>
