<script>
	import CheckboxLabel from './CheckboxLabel.svelte';

	export let name;
	export let label;
	export let checked;
</script>

<div>
	<input bind:checked type="checkbox" id={name} {name} />
	<CheckboxLabel {name}>{label}</CheckboxLabel>
</div>

<style>
	div {
		margin: 0.4rem 0;
	}

	input {
		vertical-align: middle;
	}
</style>
