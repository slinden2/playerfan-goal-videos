<script>
	import '../global.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<header>
	<Nav />
</header>
<main><slot /></main>
<Footer />

<style>
	main {
		min-height: calc(100vh - var(--header-height));
	}
</style>
