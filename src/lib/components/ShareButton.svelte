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

<div on:click|stopPropagation={shareGoal}>
	<ShareIcon class="share-svg" />
</div>

<style>
	:global(.share-svg) {
		fill: var(--white1);
	}
</style>
