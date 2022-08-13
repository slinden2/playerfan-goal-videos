<script>
	import TeamLogoLink from '../TeamLogoLink.svelte';
	import Flag from '../Flag.svelte';
	import { getFullName } from '$lib/utils/getFullName';
	export let videoProps;

	const fullName = getFullName(videoProps.player.first_name, videoProps.player.last_name);
	const [, homeTeamAbbr] = videoProps.blurb.split(':')[0].split('@');
	let homeTeamLink;
	let homeTeamLogoLink;
	let homeTeamName;
	let awayTeamLink;
	let awayTeamLogoLink;
	let awayTeamName;
	if (homeTeamAbbr === videoProps.team.abbreviation) {
		homeTeamLink = videoProps.team.link;
		homeTeamLogoLink = videoProps.team.logo_link;
		homeTeamName = videoProps.team.name;
		awayTeamLink = videoProps.opponent.link;
		awayTeamLogoLink = videoProps.opponent.logo_link;
		awayTeamName = videoProps.opponent.name;
	} else {
		homeTeamLink = videoProps.opponent.link;
		homeTeamLogoLink = videoProps.opponent.logo_link;
		homeTeamName = videoProps.opponent.name;
		awayTeamLink = videoProps.team.link;
		awayTeamLogoLink = videoProps.team.logo_link;
		awayTeamName = videoProps.team.name;
	}
</script>

<div class="video-meta">
	<a href={videoProps.player.link} target="_blank" rel="noopener noreferrer">
		<img class="modal-avatar" src={videoProps.player.img_link} alt={fullName} title={fullName} /></a
	>
	<div class="bio">
		<div class="flag-wrapper">
			<div class="name-container">
				<a
					class="player-link"
					href={videoProps.player.link}
					target="_blank"
					rel="noopener noreferrer"
				>
					<p>{videoProps.player.first_name}<br />{videoProps.player.last_name}</p>
				</a>
				<div class="secondary-data">
					<p>{videoProps.player.position}</p>
					<p>#{videoProps.player.jersey_number}</p>
				</div>
			</div>
			<Flag class="flag" countryCode={videoProps.player.nationality} />
		</div>
	</div>
	<div class="team-container">
		<TeamLogoLink
			class="team-logo"
			teamLink={awayTeamLink}
			imgLink={awayTeamLogoLink}
			teamName={awayTeamName}
		/>
		<span>VS</span>
		<TeamLogoLink
			class="team-logo"
			teamLink={homeTeamLink}
			imgLink={homeTeamLogoLink}
			teamName={homeTeamName}
		/>
	</div>
</div>

<style>
	.video-meta {
		display: flex;
		align-items: center;
		padding: 0.4rem;
	}

	.modal-avatar {
		display: block;
		width: 64px;
		height: 64px;
		border-radius: 50%;
	}

	.bio {
		margin-left: 1rem;
	}

	.flag-wrapper {
		display: flex;
		align-items: center;
	}

	.name-container {
		font-size: 1.4rem;
		font-weight: bold;
	}

	.player-link:hover {
		color: var(--grey1);
	}

	.flag-wrapper :global(.flag) {
		width: 24px;
		margin-left: 1rem;
	}

	.secondary-data {
		display: flex;
		justify-content: space-between;
		font-weight: bold;
	}

	.secondary-data p {
		margin: 0;
	}

	.team-container {
		display: none;
	}

	@media screen and (min-width: 300px) and (min-height: 400px) {
		.team-container {
			margin-left: auto;
			display: flex;
			align-items: center;
		}

		.team-container span {
			margin-left: 0.6rem;
			margin-right: 0.6rem;
			font-size: 1.4rem;
			font-weight: bolder;
		}

		.team-container :global(.team-logo) {
			width: 36px;
		}
	}

	@media screen and (min-width: 350px) and (min-height: 450px) {
		.team-container :global(.team-logo) {
			width: 50px;
		}
	}

	@media screen and (min-width: 640px) and (min-height: 640px) {
		.video-meta {
			padding: 1rem;
		}

		.modal-avatar {
			width: 100px;
			height: 100px;
		}

		.bio {
			margin-left: 1rem;
		}

		.name-container {
			font-size: 2rem;
			line-height: 2.5rem;
		}

		.flag-wrapper :global(.flag) {
			width: 36px;
		}

		.team-container span {
			margin-left: 1rem;
			margin-right: 1rem;
			font-size: 3rem;
		}

		.team-container :global(.team-logo) {
			width: 75px;
		}
	}
</style>
