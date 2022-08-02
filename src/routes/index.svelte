<script context="module">
	export async function load({ fetch }) {
		const res = await fetch(`/api/goals`);
		const { goals, count } = await res.json();
		if (res.ok) {
			return {
				props: { goals, count }
			};
		}
	}
</script>

<script>
	import MainWindow from '$lib/components/MainWindow.svelte';

	export let goals;
	export let count;
</script>

<svelte:head>
	<title>PlayerFan</title>
</svelte:head>

<MainWindow {goals} {count} />
