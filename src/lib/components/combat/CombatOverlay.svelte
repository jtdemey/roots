<script type="ts">
  import { CombatOverlayEffects, type ICombatOverlayEffect } from "$lib/data/combat/CombatOverlayEffects";
  import { health } from "$lib/stores/player/PlayerStore";

  const getGradients = (): string => {
    const gradients: ICombatOverlayEffect[] = [];
    return "";
  };
</script>

<div style="background: {getGradients()}">
  <slot />
</div>

<style>
  div {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
