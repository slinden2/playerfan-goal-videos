<script>
	import Flag from '../Flag.svelte';

	export let playerArray;
	export let value;

	function handleSelection(player) {
		value = `${player.first_name} ${player.last_name} (${player.id})`;
	}
</script>

<svelte:window
	on:click={(e) => {
		playerArray = [];
	}}
	on:keydown={(e) => {
		if (e.code === 'Escape') {
			playerArray = [];
		}
	}}
/>
<ul class="search-results">
	{#each playerArray as player}
		<button
			alt={`select ${player.first_name} ${player.last_name}`}
			on:click|preventDefault={() => handleSelection(player)}
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
		</button>
	{/each}
</ul>

<style>
	.search-results {
		position: absolute;
		background-color: var(--black0);
		border-radius: 2px;
		transform: translateY(6px);
		width: 100%;
		z-index: 1;
	}

	.search-results button {
		display: block;
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
		width: 100%;
	}

	.search-results li {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.6rem 1rem;
	}

	.search-results li:hover {
		background-color: var(--black3);
	}

	.search-results button:focus > li {
		background-color: var(--black3);
	}

	.search-results button:not(:last-child) > li {
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
</style>
