<script>
	import Flag from '../Flag.svelte';
	import { getFullName } from '$lib/utils/getFullName';
	import { getPosition } from '$lib/utils/getPosition';
	import TeamLogoLink from '../TeamLogoLink.svelte';

	export let playerLink;
	export let avatar;
	export let firstName;
	export let lastName;
	export let title;
	export let position;
	export let nationality;
	export let teamName;
	export let teamLink;
	export let teamLogoLink;
	export let assist1_lastName;
	export let assist2_lastName;

	$: fullName = getFullName(firstName, lastName);
	$: positionDesc = getPosition(position);
</script>

<div class="meta-container">
	<a class="img-link" href={playerLink} target="_blank" rel="noopener noreferrer">
		<img class="avatar" src={avatar} alt={fullName} title={fullName} />
	</a>
	<div class="title-container">
		<h1>{title}</h1>
		<div class="meta-data-container">
			<p class="meta-data">
				<a class="name-link" href={playerLink} target="_blank" rel="noopener noreferrer"
					>{fullName}</a
				>
				<Flag class="flag" countryCode={nationality} />
			</p>
			<p class="meta-data">
				<span title={positionDesc}>{position}</span>
				<TeamLogoLink class="team-logo" {teamLink} imgLink={teamLogoLink} {teamName} />
			</p>
			{#if assist1_lastName}
				<div class="assists">
					<span>{assist1_lastName}</span><br />
					{#if assist2_lastName}
						<span>{assist2_lastName}</span>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.meta-container {
		display: flex;
		position: relative;
	}

	.img-link {
		display: block;
		margin-top: 12px;
		margin-right: 12px;
		align-self: flex-start;
	}

	.avatar {
		width: 36px;
		height: 36px;
		border-radius: 50%;
	}

	.title-container {
		margin-top: 1.2rem;
	}

	h1 {
		align-self: center;
		font-size: 1.6rem;
		line-height: 2.2rem;
		margin: 0;
	}

	.name-link:hover {
		color: #fff;
		text-decoration: none;
	}

	.meta-data-container {
		color: var(--grey1);
		margin-top: 0.4rem;
		font-size: 1.4rem;
		line-height: 2rem;
	}

	p {
		margin: 0;
	}

	.meta-data {
		display: flex;
		align-items: center;
	}

	.meta-data :global(.flag) {
		width: 20px;
		margin-left: 0.6rem;
	}

	.meta-data :global(.team-logo) {
		margin-left: 0.6rem;
		width: 24px;
	}

	.assists {
		position: absolute;
		right: 0;
		bottom: 0;
		margin-left: 2rem;
		font-size: 0.9em;
		line-height: 1.6rem;
		padding: 0.2rem 0.6rem;
	}
</style>
