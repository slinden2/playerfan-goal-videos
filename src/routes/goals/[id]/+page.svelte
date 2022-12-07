<script>
	import VideoModalContent from '$lib/components/VideoModal/VideoModalContent.svelte';

	export let data;
	const { videoProps } = data;
</script>

<svelte:head>
	<title>PlayerFan | {videoProps.title}</title>
</svelte:head>

<div class="main-wrapper">
	<h1>{videoProps.title}</h1>
	<VideoModalContent {videoProps} />
</div>

<style>
	.main-wrapper {
		padding: 3rem 1rem 0 1rem;
		margin: 0 auto;
		height: calc(100vh - var(--header-height));
		width: calc((100vh - var(--header-height)));
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}

	h1 {
		font-size: 2rem;
	}
</style>
