<script>
	import CheckboxLabel from './CheckboxLabel.svelte';

	export let name;
	export let id;
	export let label;
	export let group;
</script>

<div>
	<input bind:group type="radio" {name} {id} value={id} />
	<CheckboxLabel name={id}>{label}</CheckboxLabel>
</div>

<style>
	div {
		margin: 0.4rem 0;
	}

	input {
		vertical-align: middle;
	}
</style>
