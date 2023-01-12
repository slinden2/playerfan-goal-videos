<script>
	import Checkbox from './Checkbox.svelte';
	import RadioButton from './RadioButton.svelte';

	export let playoffValue;
	export let sortValue;
</script>

<div class="container">
	<Checkbox bind:checked={playoffValue} name="onlyPlayoffs" label="Only Playoffs" />
	<div>
		<RadioButton bind:group={sortValue} name="sortOrder" id="desc" label="Descending" />
		<RadioButton bind:group={sortValue} name="sortOrder" id="asc" label="Ascending" />
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.container > :global(*) {
		flex-shrink: 0;
	}
</style>
