<script>
	import QuestionMark from '$lib/assets/QuestionMark.svelte';

	export let searchBarWidth;
</script>

<div class="wrapper">
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
			<li>name:"Seguin" against:"Flyers"</li>
			<li>for:"leafs" against:"ottawa"</li>
			<li>country:"FIN"</li>
			<li>for:"avalanche" season:"2021"</li>
		</ul>
		<hr />
		<h3>Available modifiers</h3>
		<ol>
			<li>name (player name)</li>
			<li>for (team name / city / abbreviation)</li>
			<li>against (team name / city / abbreviation)</li>
			<li>country</li>
			<li>season</li>
		</ol>
		<p>
			Note that if <strong>any</strong> modifiers are used and the search includes a player name, also
			the 'name' modifier must be used.
		</p>
	</div>
</div>

<style>
	.wrapper {
		position: absolute;
		top: 5px;
		right: -25px;
	}

	.wrapper :global(.question-mark) {
		width: 20px;
		fill: var(--purple1);
		transition: all ease-in-out 0.1s;
	}

	.wrapper :global(.question-mark:hover),
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

	h3 {
		font-size: 1.6rem;
		text-decoration: underline;
	}

	p {
		font-size: 1.4rem;
	}

	.example {
		line-height: 1;
		font-weight: bolder;
	}

	ul,
	ol {
		font-size: 1.2rem;
		margin-left: 1rem;
	}

	ol {
		padding-inline-start: 1.4rem;
	}

	li {
		margin-bottom: 0.6rem;
	}

	hr {
		border: 2px solid var(--grey1);
		margin: 1.6rem 0;
		border-radius: 1px;
	}
</style>
