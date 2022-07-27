<script>
	import { browser } from '$app/env';
	import Modal from './Modal.svelte';
	import VideoCard from './VideoCard/VideoCard.svelte';
	import goalStore from '$lib/stores/goalStore';

	export let goals;
	export let search;

	let goalsAvailable = true;

	$: goalStore.set(goals);
	$: goalsAvailable;

	let showModal = false;
	let scrollTop = null;
	let scrollLeft = null;
	let modalContent;
	let modalProps = {};

	function toggleModal(component, props) {
		modalContent = component;
		modalProps = props;
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

	$: showMoreGoals;
	async function showMoreGoals() {
		const newOffset = $goalStore.length;
		try {
			const queryUrl = !search
				? `/api/goals?offset=${newOffset}`
				: `../api/goals?${search}&offset=${newOffset}`;
			const response = await fetch(queryUrl);
			const { goals } = await response.json();
			goalStore.set([...$goalStore, ...goals]);
			if (newOffset >= $goalStore.length) {
				goalsAvailable = false;
			}
		} catch (err) {
			console.error('Error fetching more posts in MainWindow');
		}
	}
</script>

<div class="video-container">
	{#each $goalStore as goalData}
		<VideoCard {goalData} {toggleModal} />
	{/each}
</div>
{#if goalsAvailable}
	<div class="load-more">
		<button on:click={showMoreGoals}>Load More</button>
	</div>
{/if}

{#if showModal}
	<Modal on:click={toggleModal} {modalContent} {modalProps} />
{/if}

<style>
	.video-container {
		margin: 3rem 1rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		grid-column-gap: 1.6rem;
		grid-row-gap: 2rem;
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
	}

	.load-more button:hover {
		background-color: var(--black3);
		transition: background-color 100ms ease-in-out;
	}
</style>
