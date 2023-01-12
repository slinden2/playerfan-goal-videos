<script>
	export let name;
</script>

<label for={name}><slot /></label>

<style>
	label {
		display: block;
		margin-bottom: 0.6rem;
	}
</style>
