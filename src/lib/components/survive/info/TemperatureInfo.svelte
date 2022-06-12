<script type="ts">
  import { PlayerTemperatures } from "$lib/data/player/PlayerTemperatures";
  import { temperature } from "$lib/stores/player/PlayerStore";

  const getTemperatureStatus = (temp: number): string => {
    let status: string = "dead";
		let isStatusSet: boolean = false;
    Object.keys(PlayerTemperatures).forEach((key: string) => {
			if (isStatusSet === true) return;
      const currentStatus = PlayerTemperatures[key];
      if (currentStatus >= temp) {
        status = key;
				isStatusSet = true;
      }
    });
    return status.toLocaleLowerCase();
  };
</script>

<div>
  <h4>
    Your body is {getTemperatureStatus($temperature)}.
  </h4>
  <h3>
    {$temperature}&deg;F
  </h3>
</div>

<style>
  div {
    display: flex;
    justify-content: space-between;
  }

  h4 {
    padding: 0.25rem 1rem;
    font-weight: lighter;
  }

  h3 {
    padding: 0.05rem 1rem;
    font-size: 1.25rem;
  }
</style>