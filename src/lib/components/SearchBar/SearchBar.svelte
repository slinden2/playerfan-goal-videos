<script>
	import { goto } from '$app/navigation';
	import Tooltip from './Tooltip.svelte';

	let value = '';
	let hasError = false;
	let showError = false;
	let lastKeyPressed = null;
	let searchBarWidth = null;

	let onlyPlayoffs = false;
	let isAscending = false;
	let searchAssists = false;

	const MODIFIERS = ['name', 'for', 'against', 'country', 'season'];
	const RE = /^[a-zA-Z\s]*$/g;
	const RE_MOD = /^((name|for|against|country|season):"\S[a-zA-Z\s0-9]*\S"\s*)+$/g;

	function hasModifiers(searchStr) {
		return searchStr.includes(':') || searchStr.includes('"');
	}

	function handleInput() {
		const words = value.split(' ');
		if (lastKeyPressed !== 'Backspace' && lastKeyPressed !== 'Delete') {
			if (MODIFIERS.includes(words[words.length - 1].toLowerCase())) {
				value = value + ':' + '""' + ' ';
			}
		}

		// Check if the input contains modifiers
		if (hasModifiers(value)) {
			value.match(RE_MOD) ? (hasError = false) : (hasError = true);
		} else {
			value.match(RE) ? (hasError = false) : (hasError = true);
		}

		if (!hasError) {
			showError = false;
		}
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
			goto(`/search/${queryString}`);
		}
	}
</script>

<svelte:window on:keydown={(e) => (lastKeyPressed = e.key)} />
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
</style>
