<script context="module">
	export async function load({ fetch }) {
		const res = await fetch(`/api/goals`);
		const { goals } = await res.json();
		if (res.ok) {
			return {
				props: { goals }
			};
		}
	}
</script>

<script>
	import MainWindow from '../components/MainWindow.svelte';

	export let goals;
</script>

<svelte:head>
	<title>PlayerFan</title>
</svelte:head>

<MainWindow {goals} />
