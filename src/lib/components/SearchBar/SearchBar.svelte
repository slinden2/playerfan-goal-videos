<script>
	import { page } from '$app/stores';
	import Flag from '../Flag.svelte';

	let value = '';
	let hasError = false;
	let lastKeyPressed = null;
	let searchBarWidth = null;

	let hideResults = true;
	$: searchResultArray = [];

	function handleInput() {
		if (value.length > 2) {
			const searchStr = value.toLowerCase();
			searchResultArray = $page.data.players.filter((player) => {
				if (player.last_name.toLowerCase().includes(searchStr)) {
					return player;
				}

				if (player.first_name.toLowerCase().includes(searchStr)) {
					return player;
				}
			});
		} else {
			searchResultArray = [];
		}

		if (searchResultArray.length) {
			hideResults = false;
		} else {
			hideResults = true;
		}
	}

	function handleOnSubmit() {
		// TODO
	}
</script>

<svelte:window
	on:keydown={(e) => {
		lastKeyPressed = e.key;
	}}
	on:click={() => {
		value = '';
		hideResults = true;
		searchResultArray = [];
	}}
/>
<div class="search-container">
	<form on:submit|preventDefault={handleOnSubmit}>
		<div bind:clientWidth={searchBarWidth}>
			<input
				class:input-error={hasError}
				bind:value
				on:input={(e) => handleInput(e)}
				type="text"
				name="search-bar"
				placeholder="Search"
			/>
		</div>
		<a href="/search">Advanced search</a>
	</form>
	<ul class="search-results" class:hideResults>
		{#each searchResultArray as player}
			<a
				href={`/search/q?pid=${player.id}`}
				alt={`${player.first_name} ${player.last_name} videos`}
			>
				<li>
					<img src={player.img_link} alt={`${player.first_name} ${player.last_name} avatar`} />
					<p>{`${player.first_name} ${player.last_name}`}</p>
					<div class="flag-container">
						<p class="position">{player.position}</p>
						<p class="jersey-number">{`#${player.jersey_number}`}</p>
						<Flag class="flag" countryCode={player.nationality} />
					</div>
				</li>
			</a>
		{/each}
	</ul>
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

	input[type='text'] {
		background-color: var(--black0);
		height: 3.8rem;
		width: 100%;
		padding-left: 0.6rem;
		color: #fff;
		border: 1px solid var(--black3);
	}

	.input-error {
		outline: 2px solid red;
	}
	.search-results {
		position: absolute;
		background-color: var(--black0);
		border-radius: 2px;
		transform: translateY(6px);
		width: 100%;
		z-index: 1;
	}

	.search-results li {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
	}

	.search-results li:hover {
		background-color: var(--black3);
	}

	.search-results a:focus > li {
		background-color: var(--black3);
	}

	.search-results a:not(:last-child) > li {
		border-block-end: 1px solid var(--black3);
	}

	.search-results img {
		border-radius: 50%;
		width: 30px;
	}

	.search-results p {
		font-size: 1.4rem;
	}

	.flag-container {
		margin-left: auto;
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100px;
		justify-content: center;
		align-items: center;
		flex: 0 0 100px;
	}

	.flag-container > * {
		justify-self: center;
	}

	.flag-container .jersey-number {
		display: none;
	}

	:global(.flag) {
		width: 24px;
		justify-self: center;
	}

	@media (min-width: 470px) {
		.flag-container {
			grid-template-columns: 40px 60px 1fr;
			flex: 0 0 140px;
		}
		.flag-container .jersey-number {
			display: block;
		}
	}

	@media (min-width: 1000px) {
		.search-results img {
			border-radius: 50%;
			width: 50px;
		}
	}

	.hideResults {
		display: none;
	}
</style>
