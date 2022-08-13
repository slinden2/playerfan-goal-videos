<script context="module">
	export async function load({ fetch, params }) {
		const res = await fetch(`/api/goals?id=${params.id}`);
		const { goals } = await res.json();
		if (res.ok) {
			return {
				props: { goalData: goals[0] }
			};
		}
	}
</script>

<script>
	import VideoHolder from '$lib/components/VideoHolder/VideoHolder.svelte';

	export let goalData;
</script>

<svelte:head>
	<title>PlayerFan | {goalData.title}</title>
</svelte:head>

<div class="main-wrapper">
	<h1>{goalData.title}</h1>
	<div class="video-wrapper">
		<VideoHolder videoProps={goalData} />
	</div>
</div>

<style>
	.main-wrapper {
		padding: 3rem 1rem 0 1rem;
		margin: 0 auto;
		height: calc(100vh - var(--header-height));
		max-width: 1300px;
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}

	h1 {
		font-size: 2rem;
	}

	.video-wrapper {
		height: 100%;
	}
</style>
