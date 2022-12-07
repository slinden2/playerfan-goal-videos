export async function load({ fetch }) {
	const res = await fetch(`/api/goals`);
	const { goals, count } = await res.json();

	if (res.ok) {
		return {
			goals,
			count
		};
	}
}

export let ssr = true;
