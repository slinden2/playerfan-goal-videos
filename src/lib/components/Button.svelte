<script>
	export let type = 'button';
	export let onClickCallback;
</script>

<button {type} on:click={onClickCallback}><slot /></button>

<style>
	button {
		padding: 1rem 2rem;
		border-radius: 2px;
		border: 2px solid var(--black3);
		background-color: var(--black1);
		color: var(--white1);
		cursor: pointer;
	}

	button:hover {
		background-color: var(--black3);
		transition: background-color 100ms ease-in-out;
	}
</style>
