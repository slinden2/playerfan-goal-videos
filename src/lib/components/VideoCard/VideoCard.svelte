<script>
	import VideoHolder from '../VideoHolder/VideoHolder.svelte';
	import MetaData from './MetaData.svelte';
	import ShareIcon from '$lib/assets/ShareIcon.svelte';
	import { isIOS } from '$lib/utils/isIOS.js';

	export let goalData;
	export let toggleModal;
	let show = false;

	$: id = goalData.id;
	$: firstName = goalData.player.first_name;
	$: lastName = goalData.player.last_name;
	$: position = goalData.player.position;
	$: playerLink = goalData.player.link;
	$: avatar = goalData.player.img_link;
	$: title = goalData.title;
	$: nationality = goalData.player.nationality;
	$: teamLink = goalData.team.link;
	$: teamLogoLink = goalData.team.logo_link;
	$: teamName = goalData.team.name;
	$: assist1_lastName = goalData.assist1_last_name;
	$: assist2_lastName = goalData.assist2_last_name;

	$: date = new Date(goalData.date).toLocaleDateString();

	const getGoalLink = (id) => {
		const link = window.location.href + `goals/${id}`;
		return link;
	};

	function copyLinkToGoalIOSFallback(id) {
		let textarea;
		let result;
		try {
			textarea = document.createElement('textarea');
			textarea.setAttribute('readonly', true);
			textarea.setAttribute('contenteditable', true);
			textarea.style.position = 'fixed'; // prevent scroll from jumping to the bottom when focus is set.
			textarea.value = getGoalLink(id);

			document.body.appendChild(textarea);

			textarea.focus();
			textarea.select();

			const range = document.createRange();
			range.selectNodeContents(textarea);

			const sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);

			textarea.setSelectionRange(0, textarea.value.length);
			result = document.execCommand('copy');

			show = true;
			setTimeout(() => {
				show = false;
			}, 200);
		} catch (err) {
			console.error(err);
		} finally {
			document.body.removeChild(textarea);
		}
	}

	async function copyLinkToGoal(id) {
		try {
			const { state } = await navigator.permissions.query({ name: 'clipboard-write' });
			if (state === 'granted' || state === 'prompt') {
				show = true;
				setTimeout(() => {
					show = false;
				}, 200);
				await navigator.clipboard.writeText(getGoalLink(id));
			}
		} catch (err) {
			return new Error(err);
		}
	}
</script>

<div class="video-card">
	<div class="img-container" on:click={() => toggleModal(VideoHolder, goalData)}>
		<img class="thumbnail" src={goalData.thumbnail} alt={goalData.title} title={goalData.title} />
		<div class="overlay date">{date}</div>
		<div class="overlay duration">{goalData.duration}</div>
		<div class="arrow-right" />
		<div
			class="overlay share-icon"
			on:click|stopPropagation={isIOS(navigator)
				? () => copyLinkToGoalIOSFallback(id)
				: () => copyLinkToGoal(id)}
		>
			<ShareIcon class="share-svg" />
			<div class="copied-text" class:show>Copied!</div>
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
		cursor: pointer;
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
		background-color: rgba(0, 0, 0, 0.6);
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
	}

	.img-container:hover .arrow-right {
		border-left: 25px solid var(--playArrowColorHover);
	}

	.share-icon {
		position: absolute;
		width: 25px;
		top: 10px;
		right: 10px;
		padding: 3px 5px 3px 5px;
		transition: all 0.1s ease-in-out;
	}

	.share-icon:hover {
		width: 29px;
		translate: 2px -2px;
	}

	.copied-text {
		position: absolute;
		top: -15px;
		left: -5px;

		opacity: 0;
		transition: all 0.1s ease-in;
		-webkit-transition: all 0.1s ease-in;
		border-radius: 2px;
		background-color: rgba(0, 0, 0, 0.6);
	}

	.show {
		scale: 1.2;
		opacity: 1;
	}

	.share-icon :global(.share-svg) {
		fill: var(--white1);
		stroke-width: 1px;
	}
</style>
