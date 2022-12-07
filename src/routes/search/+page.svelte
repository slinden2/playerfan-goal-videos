<script>
	import MainWindow from '$lib/components/MainWindow.svelte';

	export let data;
	$: ({ goals, count, searchParams } = data);
</script>

<svelte:head>
	<title>PlayerFan</title>
</svelte:head>

<MainWindow {goals} {count} {searchParams} />
