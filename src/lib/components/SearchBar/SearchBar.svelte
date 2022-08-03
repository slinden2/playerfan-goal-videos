<script>
	import { goto } from '$app/navigation';
	import Tooltip from './Tooltip.svelte';

	let value = '';
	let hasError = false;
	let errorMessage = '';
	let lastKeyPressed = null;
	let onlyPlayoffs = false;
	let searchBarWidth = null;

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
			errorMessage = '';
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
			errorMessage = 'Invalid search string';
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

			const queryString = buildQueryString(params);
			const queryStringWithCheckbox = onlyPlayoffs ? queryString + '&type=P' : queryString;

			value = '';
			onlyPlayoffs = false;
			goto(`/search/${queryStringWithCheckbox}`);
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
		<div class="error-message">{errorMessage}</div>
		<Tooltip {searchBarWidth} />
		<div class="checkbox-wrapper">
			<label
				>Only playoffs
				<input type="checkbox" name="only-playoffs" bind:checked={onlyPlayoffs} />
			</label>
		</div>
	</form>
</div>

<style>
	.search-container {
		min-width: 200px;
		width: 95%;
		margin: 0 auto;
		position: relative;
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
		transform: translateY(4px);
	}
	.checkbox-wrapper {
		margin: 0.6rem auto;
		position: absolute;
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
