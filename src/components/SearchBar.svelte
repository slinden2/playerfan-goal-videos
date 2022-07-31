<script>
	import { goto } from '$app/navigation';
	import QuestionMark from '$lib/assets/QuestionMark.svelte';

	let value;
	$: searchBarWidth = null;

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
		const re = /((name|for|against|country):"[\w\s]+")/g;
		let matches = value.match(re);

		if (!matches) {
			matches = [`name:"${value}"`];
		}

		const params = matches.reduce((acc, cur) => {
			const [key, val] = cur.split(':');
			return { ...acc, [key]: val.replace(/"/g, '') };
		}, {});

		const queryString = buildQueryString(params);
		value = '';
		goto(`/search/${queryString}`);
	}
</script>

<div class="search-container">
	<form on:submit|preventDefault={handleOnSubmit}>
		<div class="input-wrapper" bind:clientWidth={searchBarWidth}>
			<input bind:value type="text" name="search-bar" placeholder="Search" />
		</div>
		<div class="tooltip-wrapper">
			<div class="svg-wrapper">
				<svelte:component this={QuestionMark} class="question-mark" />
			</div>
			<div class="tooltip" style="width: {searchBarWidth}px">
				<h3>Search tips</h3>
				<p>Enter text without any modifiers to search videos by player name.</p>

				<p class="example">Examples:</p>
				<ul>
					<li>mcdavid</li>
					<li>John Tavares</li>
				</ul>
				<hr />
				<p>
					You can use certain modifiers to perform a more precise search. Please see below for all
					available modifiers.
				</p>
				<p class="example">Examples:</p>
				<ul>
					<li>name:"Ovechkin" against:"Flyers"</li>
					<li>for:"leafs" against:"ottawa"</li>
					<li>country:"FIN"</li>
				</ul>
				<hr />
				<h3>Available modifiers</h3>
				<ol>
					<li>name (player name)</li>
					<li>for (team name / city / abbreviation)</li>
					<li>against (team name / city / abbreviation)</li>
					<li>country</li>
				</ol>
				<p>
					Note that if <strong>any</strong> modifiers are used and the search includes a player name,
					also the 'name' modifier must be used.
				</p>
			</div>
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

	input {
		background-color: var(--black0);
		height: 3.8rem;
		width: 100%;
		padding-left: 0.6rem;
		color: #fff;
		border: 1px solid var(--black3);
	}

	.tooltip-wrapper {
		position: absolute;
		top: 5px;
		right: -25px;
	}

	.tooltip-wrapper.tooltip-wrapper :global(.question-mark) {
		width: 20px;
		fill: var(--purple1);
		transition: all ease-in-out 0.1s;
	}

	.tooltip-wrapper :global(.question-mark:hover),
	:global(.question-mark:focus) {
		fill: #000000;
		cursor: pointer;
		fill: var(--white1);
		filter: drop-shadow(0px 0px 2px rgba(255, 255, 255, 0.7));
	}

	.svg-wrapper:hover + .tooltip {
		display: block;
	}

	.tooltip {
		display: none;
		background-color: var(--black1);
		border: 2px solid var(--grey1);
		border-radius: 2px;
		padding: 1rem;
		top: 50px;
		right: 25px;
		position: absolute;
		z-index: 1;
	}

	.tooltip h3 {
		font-size: 1.6rem;
		text-decoration: underline;
	}

	.tooltip p {
		font-size: 1.4rem;
	}

	.tooltip .example {
		line-height: 1;
		font-weight: bolder;
	}

	.tooltip ul,
	ol {
		font-size: 1.2rem;
		margin-left: 1rem;
	}

	.tooltip ol {
		padding-inline-start: 1.4rem;
	}

	.tooltip li {
		margin-bottom: 0.6rem;
	}

	.tooltip hr {
		border: 2px solid var(--grey1);
		margin: 1.6rem 0;
		border-radius: 1px;
	}
</style>
