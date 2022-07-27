<script>
	export let modalContent;
	export let modalProps;
</script>

<div on:click|self class="modal">
	<div class="content">
		<svelte:component this={modalContent} {modalProps} />
	</div>
</div>

<style>
	.modal {
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
	}

	.content {
		background-color: var(--black0);
		border: 2px solid var(--black3);
		width: calc(145vh - 273px);
		max-width: calc(100% - 16px);
		height: 100%;
		max-height: 60vh;
	}

	@media screen and (min-width: 450px) {
		.content {
			max-height: 80vh;
		}
	}
</style>
