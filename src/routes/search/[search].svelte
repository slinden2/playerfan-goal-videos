<script context="module">
	export async function load({ fetch, params }) {
		const res = await fetch(`/api/goals?${params.search}`);
		const { goals, count } = await res.json();
		if (res.ok) {
			return {
				props: { goals, count, search: params }
			};
		}
	}
</script>

<script>
	import MainWindow from '$lib/components/MainWindow.svelte';

	export let goals;
	export let count;
	export let search;
</script>

<svelte:head>
	<title>PlayerFan</title>
</svelte:head>

<MainWindow {goals} {count} {...search} />
