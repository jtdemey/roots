<script lang="ts">
	export let abbreviation: string = "";
	export let maximumValue: number = 100;
  export let statuses: any = {};
  export let text: string = "";
  export let value: number = 100;

  const getStatus = (stats: any, val: number): string => {
    let status: string = "";
    Object.keys(stats).forEach((key: string) => {
      if (stats[key] > val) return;
      status = key;
    });
		return status.toLocaleLowerCase();
  };
</script>

<div>
	<h4>
		{text}
		{getStatus(statuses, value)}.
	</h4>
	<h3>{value}/{maximumValue} {abbreviation}</h3>
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