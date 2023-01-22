<script>
	import { getCountryName } from '$lib/utils/getCountryName';

	export let countryCode;

	let countryName = getCountryName(countryCode);
</script>

{#if countryCode !== 'RUS'}
	<img
		class={$$props.class}
		src={`https://countryflagsapi.com/svg/${countryCode}`}
		alt={countryName + ' ' + 'flag'}
		title={countryName}
		crossorigin
	/>
{/if}
