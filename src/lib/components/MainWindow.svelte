<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import VideoModal from './VideoModal/VideoModal.svelte';
	import VideoCard from './VideoCard/VideoCard.svelte';
	import goalStore from '$lib/stores/goalStore';

	export let goals;
	export let count;
	export let searchParams = undefined;
	$: goalStore.set(goals);

	let showModal = false;
	let scrollTop = null;
	let scrollLeft = null;
	let videoProps = {};
	let moreGoalsAvailable;
	const limit = 25;

	$: {
		moreGoalsAvailable = !!count && count > limit;
	}

	function toggleModal(modalData) {
		videoProps = modalData;
		showModal = !showModal;
	}

	function disableScroll() {
		if (browser) {
			scrollTop = window.pageYOffset || window.document.documentElement.scrollTop;
			(scrollLeft = window.pageXOffset || window.document.documentElement.scrollLeft),
				(window.onscroll = () => {
					window.scrollTo(scrollLeft, scrollTop);
				});
		}
	}

	function enableScroll() {
		if (browser) {
			window.onscroll = () => {};
		}
	}

	$: if (showModal) {
		disableScroll();
	} else {
		enableScroll();
	}

	async function showMoreGoals() {
		if (moreGoalsAvailable) {
			const newOffset = $goalStore.length;
			try {
				if (!searchParams) {
					searchParams = new URLSearchParams();
				}
				searchParams.set('offset', newOffset);
				const response = await fetch(`/api/goals?${searchParams}`);
				const { goals } = await response.json();
				goalStore.set([...$goalStore, ...goals]);
				if (newOffset + limit >= count) {
					moreGoalsAvailable = false;
				}
			} catch (err) {
				console.error(`Error while fetching more posts in MainWindow\n${err}`);
			}
		}
	}
</script>

{#if count}
	<div class="video-container">
		{#each $goalStore as goalData}
			<VideoCard {goalData} {toggleModal} />
		{/each}
	</div>
{:else}
	<div class="no-results">
		<div>
			<p>No results found.</p>
			<p>
				Please try a different search. Click the question mark next to the search bar for search
				tips.
			</p>
		</div>
		<div class="load-more">
			<button on:click={() => goto('/')}>Back</button>
		</div>
	</div>
{/if}
{#if moreGoalsAvailable}
	<div class="load-more">
		<button on:click={showMoreGoals}>Load More</button>
	</div>
{/if}

{#if showModal}
	<VideoModal {toggleModal} {videoProps} />
{/if}

<style>
	.video-container {
		margin: 3rem 1rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		grid-column-gap: 1.6rem;
		grid-row-gap: 2rem;
	}

	.no-results {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 4rem;
		text-align: center;
	}

	@media screen and (min-width: 640px) {
		.video-container {
			margin: 3rem;
			grid-template-columns: repeat(auto-fit, minmax(276px, 1fr));
			grid-row-gap: 4rem;
		}
	}

	.load-more {
		text-align: center;
		margin: 2rem 0;
	}

	.load-more button {
		padding: 1rem 2rem;
		border-radius: 2px;
		border: 2px solid var(--black3);
		background-color: var(--black1);
		color: var(--white1);
		cursor: pointer;
	}

	.load-more button:hover {
		background-color: var(--black3);
		transition: background-color 100ms ease-in-out;
	}
</style>
