<script context="module">
	export async function load({ fetch, params }) {
		const res = await fetch(`/api/goals?${params.search}`);
		const { goals } = await res.json();
		if (res.ok) {
			return {
				props: { goals, search: params }
			};
		}
	}
</script>

<script>
	import MainWindow from '$lib/components/MainWindow.svelte';

	export let goals;
	export let search;
</script>

<svelte:head>
	<title>PlayerFan</title>
</svelte:head>

<MainWindow {goals} {...search} />
