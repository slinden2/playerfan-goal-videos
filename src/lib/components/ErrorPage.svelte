<script>
	export let message;
	export let status;
</script>

<div>
	<h1>{status}</h1>
	<p class="oops">Oops...</p>
	<p>{message}</p>
</div>

<style>
	h1 {
		font-size: 4rem;
	}

	div {
		text-align: center;
	}

	.oops {
		font-size: 2rem;
	}

	p {
		font-size: 1.6rem;
	}
</style>
