<script>
	import FieldLabel from './FieldLabel.svelte';

	export let name;
	export let label;
	export let data;
	export let value;
</script>

{#if data}
	<div>
		<FieldLabel {name}>{label}</FieldLabel>
		<select bind:value {name} id={name}>
			<option value="">Select...</option>
			{#each data as item}
				<option value={item.id}>{item.name}</option>
			{/each}
		</select>
	</div>
{/if}

<style>
	select {
		background-color: var(--black0);
		height: 3.8rem;
		width: 100%;
		padding-left: 0.2rem;
		color: #fff;
		border: 1px solid var(--black3);
	}
</style>
