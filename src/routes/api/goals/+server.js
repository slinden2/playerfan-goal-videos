import { error } from '@sveltejs/kit';

const FIELDS = `
id,
duration,
game_pk,
date,
timestamp,
period,
period_time,
title,
blurb,
description,
duration,
thumbnail,
embed_video_url,
player,
team,
opponent,
assist1_id,
assist1_first_name,
assist1_last_name,
assist1_nationality,
assist2_id,
assist2_first_name,
assist2_last_name,
assist2_nationality
`;

export async function GET({ locals, url }) {
	const filterById = url.searchParams.get('id');
	const filterByPlayerId = url.searchParams.get('pid');
	const filterByAssists = url.searchParams.get('apid');
	const filterByName = url.searchParams.get('name');
	const filterByTeam = url.searchParams.get('for');
	const filterByOpponent = url.searchParams.get('against');
	const filterByNationality = url.searchParams.get('country');
	const filterBySeason = url.searchParams.get('season');
	const filterByGameType = url.searchParams.get('game-type');
	const offset = url.searchParams.get('offset');
	const sort = url.searchParams.get('sort');

	const countType =
		filterByPlayerId || filterByName || filterByTeam || filterByOpponent || filterByNationality
			? 'exact'
			: 'estimated';
	let query = locals.supabase.from('goal_view').select(FIELDS, { count: countType });

	if (filterById) {
		query = query.eq('id', filterById);
	}

	if (filterByPlayerId) {
		query = query.eq('player_id', filterByPlayerId);
	}

	if (filterByAssists) {
		query = query.or(`assist1_id.eq.${filterByAssists},assist2_id.eq.${filterByAssists}`);
	}

	if (filterByTeam) {
		query = query.eq('team_id', filterByTeam);
	}

	if (filterByOpponent) {
		query = query.eq('opponent_id', filterByOpponent);
	}

	if (filterByNationality) {
		query = query.eq('player_nationality', filterByNationality);
	}

	if (filterBySeason) {
		query = query.eq('season', filterBySeason);
	}

	if (filterByGameType) {
		query = query.eq('game_type', filterByGameType);
	}

	const lowerLimit = offset ? parseInt(offset) : 0;
	const numOfResults = 24;
	const upperLimit = lowerLimit + numOfResults;

	const { data, count } = await query
		.order('timestamp', { ascending: sort === 'asc' })
		.range(lowerLimit, upperLimit);

	if (!data) {
		throw error(404, 'Not Found');
	}

	return new Response(
		JSON.stringify({ goals: data, count }, { headers: { 'cache-control': 'public, max-age=600' } })
	);
}
