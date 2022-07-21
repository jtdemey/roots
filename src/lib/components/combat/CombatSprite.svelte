<script type="ts">
  import { fly } from "svelte/transition";

  export let alt: string = "A placeholder image";
  export let flyConfig: object = { duration: 0, x: 0 };
  export let imgSrc: string = "/placeholder.webp";
  export let width: number = 128;
</script>

<picture in:fly={flyConfig}>
  <img {alt} src={imgSrc} {width} />
</picture>

<style>
  picture {
    margin: auto;
  }

  img {
    margin: 0.25rem;
  }
</style>
