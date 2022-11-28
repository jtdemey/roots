<script type="ts">
  export let path: string;
</script>

<div>
  <svg viewBox="0 0 210 297" xmlns="http://www.w3.org/2000/svg">
    <path d={path} />
  </svg>
</div>

<style>
  div {
    position: relative;
  }

  svg {
    width: 40%;
    height: 40%;
  }
</style>
