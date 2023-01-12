<script>
	export let name;
</script>

<label for={name}><slot /></label>

<style>
	label {
		margin-left: 0.2rem;
	}
</style>
