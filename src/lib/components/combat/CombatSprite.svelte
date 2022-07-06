<script type="ts">
  export let alt: string = "A placeholder image";
  export let imgSrc: string = "/placeholder.webp";
  export let width: number = 128;
</script>

<picture>
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
