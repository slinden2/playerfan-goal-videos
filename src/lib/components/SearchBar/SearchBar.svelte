<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Flag from '../Flag.svelte';
	import Tooltip from './Tooltip.svelte';

	let value = '';
	let hasError = false;
	let showError = false;
	let lastKeyPressed = null;
	let searchBarWidth = null;

	let onlyPlayoffs = false;
	let isAscending = false;
	let searchAssists = false;

	let hideResults = true;
	$: searchResultArray = [];

	const MODIFIERS = ['name', 'for', 'against', 'country', 'season'];
	const RE = /^[a-zA-Z\s]*$/g;
	const RE_MOD = /^((name|for|against|country|season):"\S[a-zA-Z\s0-9]*\S"\s*)+$/g;

	function hasModifiers(searchStr) {
		return searchStr.includes(':') || searchStr.includes('"');
	}

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

		// const words = value.split(' ');

		// if (lastKeyPressed !== 'Backspace' && lastKeyPressed !== 'Delete') {
		// 	if (MODIFIERS.includes(words[words.length - 1].toLowerCase())) {
		// 		value = value + ':' + '""' + ' ';
		// 	}
		// }

		// // Check if the input contains modifiers
		// if (hasModifiers(value)) {
		// 	value.match(RE_MOD) ? (hasError = false) : (hasError = true);
		// } else {
		// 	value.match(RE) ? (hasError = false) : (hasError = true);
		// }

		// if (!hasError) {
		// 	showError = false;
		// }
	}

	function buildQueryString(obj) {
		let queryString = '';
		for (const key in obj) {
			if (!queryString) {
				queryString += `${key}=${obj[key].trim()}`;
			} else {
				queryString += `&${key}=${obj[key].trim()}`;
			}
		}
		return queryString;
	}

	function handleOnSubmit() {
		if (hasError) {
			showError = true;
		} else {
			const valueLowerCase = value.toLowerCase();
			let searchArr = [];

			if (!hasModifiers(valueLowerCase)) {
				searchArr = [`name:"${valueLowerCase}"`];
			} else {
				searchArr = valueLowerCase.split(' ');
			}

			const params = searchArr
				.filter((str) => str)
				.reduce((acc, cur) => {
					const [key, val] = cur.split(':');
					return { ...acc, [key]: val.replace(/"/g, '') };
				}, {});

			let queryString = buildQueryString(params);
			queryString = onlyPlayoffs ? queryString + '&type=P' : queryString;
			queryString = searchAssists ? queryString + '&assists=true' : queryString;
			queryString = isAscending ? queryString + '&ascending=true' : queryString;

			value = '';
			onlyPlayoffs = false;
			searchAssists = false;
			isAscending = false;
			goto(`/search?${queryString}`);
		}
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
		<div class="error-message" class:active={showError}>Invalid search string</div>
		<Tooltip {searchBarWidth} />
		<div class="checkbox-wrapper">
			<div>
				<label
					>Ascending
					<input type="checkbox" name="ascending" bind:checked={isAscending} />
				</label>
			</div>
			<div>
				<label
					>Only playoffs
					<input type="checkbox" name="only-playoffs" bind:checked={onlyPlayoffs} />
				</label>
			</div>
			<div>
				<label
					>Search assists
					<input type="checkbox" name="search-assists" bind:checked={searchAssists} />
				</label>
			</div>
		</div>
	</form>
	<ul class="search-results" class:hideResults>
		{#each searchResultArray as player}
			<a href={`/search?pid=${player.id}`} alt={`${player.first_name} ${player.last_name} videos`}>
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

	.error-message {
		color: red;
		font-size: 1.2rem;
		position: absolute;
		margin: 0.6rem auto;
		right: 0;
		top: 36px;
		background-color: var(--black2);
		z-index: 1;
		width: 100%;
		text-align: center;
		padding: 0.6rem;
		opacity: 0;
		z-index: 0;
		transition: opacity ease-in 0.1s;
	}

	.error-message.active {
		z-index: 1;
		opacity: 1;
	}

	.checkbox-wrapper {
		position: absolute;
		top: 42px;
		display: flex;
		flex-wrap: wrap;
	}

	.checkbox-wrapper div {
		flex-shrink: 0;
	}

	label {
		font-size: 1.2rem;
	}

	input[type='checkbox'] {
		margin-left: 0.6rem;
		margin-right: 0.6rem;
		transform: translateY(2px);
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
