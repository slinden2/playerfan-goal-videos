<script>
	import { goto } from '$app/navigation';
	import Tooltip from './Tooltip.svelte';

	let value;
	let onlyPlayoffs = false;
	let searchBarWidth = null;

	function buildQueryString(obj) {
		let queryString = '';
		for (const key in obj) {
			if (!queryString) {
				queryString += `${key}=${obj[key]}`;
			} else {
				queryString += `&${key}=${obj[key]}`;
			}
		}
		return queryString;
	}

	function handleOnSubmit() {
		const re = /((name|for|against|country|season):"[\w\s]+")/g;
		let matches = value.match(re);

		if (!matches) {
			matches = [`name:"${value}"`];
		}

		const params = matches.reduce((acc, cur) => {
			const [key, val] = cur.split(':');
			return { ...acc, [key]: val.replace(/"/g, '') };
		}, {});

		const queryString = buildQueryString(params);
		const queryStringWithCheckbox = onlyPlayoffs ? queryString + '&type=P' : queryString;

		value = '';
		onlyPlayoffs = false;
		goto(`/search/${queryStringWithCheckbox}`);
	}
</script>

<div class="search-container">
	<form on:submit|preventDefault={handleOnSubmit}>
		<div class="input-wrapper" bind:clientWidth={searchBarWidth}>
			<input bind:value type="text" name="search-bar" placeholder="Search" />
		</div>
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
