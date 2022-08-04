<script>
	export let message;
</script>

<div>
	<h1>404</h1>
	<p class="oops">Oops...</p>
	<p>The page you are looking for does not exist.</p>
	<p>Please check the address.</p>
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
