<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PlayerInputField from './PlayerInputField.svelte';

	let searchFieldName = 'search-bar';
	let playerId = null;
	let value = '';

	$: if (playerId) {
		value = '';
		goto(`/search/q?pid=${playerId}`);
	}
</script>

<div class="search-container">
	<PlayerInputField
		name={searchFieldName}
		placeholder="Search"
		players={$page.data.players}
		bind:value
		bind:playerId
	/>
	<div class="search-link">
		<a href="/search">Advanced search</a>
	</div>
</div>

<style>
	.search-container {
		width: 85%;
		margin: 0 auto;
		position: relative;
	}

	@media screen and (min-width: 640px) {
		.search-container {
			min-width: 350px;
			width: 100%;
		}
	}

	.search-link {
		position: absolute;
		bottom: -2rem;
		font-size: 1.4rem;
	}
</style>
