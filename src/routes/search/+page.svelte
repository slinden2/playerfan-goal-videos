<script>
	import { goto } from '$app/navigation';
	import Button from '../../lib/components/Button.svelte';
	import PlayerInputField from '../../lib/components/Search/PlayerInputField.svelte';
	import SearchSwitches from '../../lib/components/Search/SearchSwitches.svelte';
	import SelectField from '../../lib/components/Search/SelectField.svelte';

	export let data;

	let scorerValue;
	let assistValue;
	let teamForValue;
	let teamAgainstValue;
	let nationalityValue;
	let seasonValue;
	let playoffValue = false;
	let sortValue = 'desc';

	function resetFields() {
		scorerValue = '';
		assistValue = '';
		teamForValue = '';
		teamAgainstValue = '';
		nationalityValue = '';
		seasonValue = '';
		playoffValue = false;
		sortValue = 'desc';
	}

	function handleSearch() {
		// Get text within parentheses
		const regex = /\((.*)\)/;
		let scorerId = '';
		if (scorerValue) {
			scorerId = scorerValue.match(regex).pop();
		}

		let assistId = '';
		if (assistValue) {
			assistId = assistValue.match(regex).pop();
		}

		const gameType = playoffValue ? 'P' : 'R';

		const searchParams = new URLSearchParams();
		searchParams.append('pid', scorerId);
		searchParams.append('apid', assistId);
		searchParams.append('for', teamForValue);
		searchParams.append('against', teamAgainstValue);
		searchParams.append('country', nationalityValue);
		searchParams.append('season', seasonValue);
		searchParams.append('game-type', gameType);
		searchParams.append('sort', sortValue);
		goto(`search/q/?${searchParams.toString()}`);
	}
</script>

<svelte:head>
	<title>PlayerFan | Search</title>
</svelte:head>

<div class="container">
	<form method="POST">
		<PlayerInputField
			bind:value={scorerValue}
			name="scorer"
			label="Scorer"
			players={data.players}
		/>
		<PlayerInputField
			bind:value={assistValue}
			name="assist"
			label="Assist"
			players={data.players}
		/>
		<SelectField bind:value={teamForValue} name="teamFor" label="Team For" data={data.teams} />
		<SelectField
			bind:value={teamAgainstValue}
			name="teamAgainst"
			label="Team Against"
			data={data.teams}
		/>
		<SelectField
			bind:value={nationalityValue}
			name="nationality"
			label="Nationality"
			data={data.nationalities}
		/>
		<SelectField bind:value={seasonValue} name="season" label="Season" data={data.seasons} />
		<SearchSwitches bind:playoffValue bind:sortValue />
		<div class="btn-container">
			<Button onClickCallback={handleSearch}>Search</Button>
			<Button onClickCallback={resetFields}>Clear</Button>
		</div>
	</form>
</div>

<style>
	.container {
		position: relative;
		margin: 0 auto;
		width: 100%;
		max-width: 700px;
		font-size: 1.4rem;
	}

	form > :global(div) {
		margin: 1.4rem 0;
	}

	.btn-container {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
</style>
