<script>
	import MainWindow from '$lib/components/MainWindow.svelte';
	export let data;
	const { goals, count } = data;
</script>

<svelte:head>
	<title>PlayerFan</title>
</svelte:head>

<MainWindow {goals} {count} />
