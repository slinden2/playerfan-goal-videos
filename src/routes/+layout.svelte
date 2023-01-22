<script>
	import '../global.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="site-wrapper">
	<header>
		<Nav />
	</header>
	<main><slot /></main>
	<Footer />
</div>

<style>
	.site-wrapper {
		width: 100%;
		height: 100%;
		min-height: 100vh;
	}

	main {
		margin: 3rem 1rem;
		height: 100%;
		min-height: calc(100vh - var(--header-height));
	}

	@media (min-width: 640px) {
		main {
			margin: 3rem;
		}
	}
</style>
