<script>
	import Flag from '../Flag.svelte';
	import FieldLabel from './FieldLabel.svelte';
	import SearchResults from './SearchResults.svelte';

	export let name;
	export let label;
	export let players;
	export let value = '';
	let searchResultArray = [];
	let showResults = false;

	function handleInput() {
		if (value.length > 2) {
			const searchStr = value.toLowerCase();
			searchResultArray = players.filter((player) => {
				if (player.last_name.toLowerCase().includes(searchStr)) {
					return player;
				}

				if (player.first_name.toLowerCase().includes(searchStr)) {
					return player;
				}
			});
			searchResultArray = searchResultArray.slice(0, 10);
		} else {
			searchResultArray = [];
		}

		if (searchResultArray.length) {
			showResults = true;
		} else {
			showResults = false;
		}
	}
</script>

<div>
	<FieldLabel {name}>{label}</FieldLabel>
	<input bind:value on:input={handleInput} type="text" {name} />
	<SearchResults bind:value playerArray={searchResultArray} />
</div>

<style>
	input[type='text'] {
		background-color: var(--black0);
		height: 3.8rem;
		width: 100%;
		padding-left: 0.6rem;
		color: #fff;
		border: 1px solid var(--black3);
	}
</style>
