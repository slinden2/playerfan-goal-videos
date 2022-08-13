<script>
	import Logo from '$lib/assets/Logo.svelte';
	import SearchBar from './SearchBar/SearchBar.svelte';
</script>

<div class="nav-container">
	<div class="logo flex-item left">
		<a href="/" alt="Playerfan"><Logo class="logo-svg" /></a>
	</div>
	<div class="search flex-item">
		<SearchBar />
	</div>
	<div class="right" />
</div>

<style>
	.nav-container {
		background-color: var(--black2);
		height: var(--header-height);
		border-bottom: 2px solid var(--black3);
	}

	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 1rem;
		margin-right: 5rem;
	}

	.logo :global(.logo-svg) {
		width: 160px;
	}

	.logo :global(.logo-svg:hover) {
		filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.7));
	}

	.search {
		width: 90%;
		margin: 0 auto;
	}

	@media screen and (min-width: 640px) {
		.nav-container {
			display: flex;
		}

		.logo :global(.logo-svg) {
			display: block;
			margin-left: 1rem;
		}

		.flex-item {
			display: flex;
			flex: 1;
			justify-content: center;
			align-items: center;
		}

		.left,
		.right {
			flex-grow: 1;
			flex-basis: 0;
		}

		.left {
			justify-content: left;
		}
	}
</style>
