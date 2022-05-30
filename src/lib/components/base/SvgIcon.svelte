<script type="ts">
	export let alt: string;
	export let iconSrc: any;
	export let width: number = 32;
</script>

<span style="width: {width}px;height: {width}px;">
	<img alt={alt} src={iconSrc} width={width} height={width} />
</span>

<style>
  span {
		width: 32px;
		height: 32px;
  }
	
	img {
		transform: translateY(1px);
	}
</style>