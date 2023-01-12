export async function load({ fetch, url }) {
	const res = await fetch('/api/goals' + url.search);
	const { goals, count } = await res.json();

	if (res.ok) {
		return {
			goals,
			count,
			searchParams: url.searchParams
		};
	}
}

export let ssr = true;
