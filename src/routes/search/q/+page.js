export async function load({ fetch, url }) {
	console.log('/api/goals' + url.search);
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
