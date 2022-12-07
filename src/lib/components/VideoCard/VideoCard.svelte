<script>
	import MetaData from './MetaData.svelte';
	import ShareButton from '../ShareButton.svelte';

	export let goalData;
	export let toggleModal;

	function handleKeyDown(event) {
		if (event.code === 'Enter') {
			toggleModal(goalData);
		}
	}

	$: id = goalData.id;
	$: firstName = goalData.player.first_name;
	$: lastName = goalData.player.last_name;
	$: position = goalData.player.position;
	$: playerLink = goalData.player.link;
	$: avatar = goalData.player.img_link;
	$: title = goalData.title;
	$: blurb = goalData.blurb;
	$: nationality = goalData.player.nationality;
	$: teamLink = goalData.team.link;
	$: teamLogoLink = goalData.team.logo_link;
	$: teamName = goalData.team.name;
	$: assist1_lastName = goalData.assist1_last_name;
	$: assist2_lastName = goalData.assist2_last_name;

	$: date = new Date(goalData.date).toLocaleDateString();
</script>

<div class="video-card">
	<div class="img-container" on:click={() => toggleModal(goalData)} on:keydown={handleKeyDown}>
		<img class="thumbnail" src={goalData.thumbnail} alt={goalData.title} title={goalData.title} />
		<div class="overlay date">{date}</div>
		<div class="overlay duration">{goalData.duration}</div>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div class="arrow-right" tabindex="0" aria-label="play video" />
		<div class="overlay share-button">
			<ShareButton {id} {blurb} />
		</div>
	</div>
	<MetaData
		{firstName}
		{lastName}
		{position}
		{playerLink}
		{avatar}
		{title}
		{nationality}
		{teamLink}
		{teamLogoLink}
		{teamName}
		{assist1_lastName}
		{assist2_lastName}
	/>
</div>

<style>
	.video-card {
		max-width: 360px;
		margin: 0 auto;
	}

	.img-container {
		position: relative;
	}

	.thumbnail {
		display: block;
		width: 100%;
	}

	.overlay {
		position: absolute;
		font-size: 1rem;
		font-weight: bolder;
		border-radius: 2px;
		background-color: rgba(0, 0, 0, 0.5);
		padding: 4px;
	}

	.overlay.date {
		top: 10px;
		left: 10px;
	}

	.overlay.duration {
		bottom: 10px;
		right: 10px;
	}

	.overlay.share-button {
		top: 10px;
		right: 10px;
	}

	.arrow-right {
		width: 0;
		height: 0;
		border-top: 25px solid transparent;
		border-bottom: 25px solid transparent;
		border-left: 25px solid var(--playArrowColor);
		position: absolute;
		margin: auto;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		transition: border 200ms ease-out;
		cursor: pointer;
	}

	.img-container:hover .arrow-right {
		border-left: 25px solid var(--playArrowColorHover);
	}

	.share-button {
		position: absolute;
		width: 25px;
		padding: 5px 5px 3px 5px;
	}
</style>
