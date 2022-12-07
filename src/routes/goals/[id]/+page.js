export async function load({ fetch, params, url }) {
	const apiUrl = new URL(`${url.origin}/api/goals`);
	const apiParams = new URLSearchParams(params);
	apiUrl.search = apiParams;
	const res = await fetch(apiUrl);
	const { goals } = await res.json();
	if (res.ok) {
		return {
			videoProps: goals[0]
		};
	}
}

export const ssr = true;
