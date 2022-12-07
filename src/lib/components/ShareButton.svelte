<script>
	import ShareIcon from '../assets/ShareIcon.svelte';

	export let id;
	export let blurb;

	const getGoalLink = (id) => {
		const link = window.location.href + `goals/${id}`;
		return link;
	};

	const shareGoal = async () => {
		const shareData = {
			title: 'Player Fan',
			text: blurb,
			url: getGoalLink(id)
		};

		try {
			await navigator.share(shareData);
		} catch (e) {
			console.error(e);
		}
	};
</script>

<button on:click|stopPropagation={shareGoal}>
	<ShareIcon class="share-svg" />
</button>

<style>
	button {
		background-color: transparent;
		border-width: 0;
		padding: 0;
		width: 100%;
		cursor: pointer;
	}

	:global(.share-svg) {
		fill: var(--white1);
	}
</style>
