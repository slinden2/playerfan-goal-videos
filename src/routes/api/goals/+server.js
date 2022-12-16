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
assist1_first_name,
assist1_last_name,
assist1_nationality,
assist2_first_name,
assist2_last_name,
assist2_nationality
`;

export async function GET({ locals, url }) {
	const filterById = url.searchParams.get('id');
	const filterByPlayerId = url.searchParams.get('pid');
	const filterByName = url.searchParams.get('name');
	const filterByTeam = url.searchParams.get('for');
	const filterByOpponent = url.searchParams.get('against');
	const filterByNationality = url.searchParams.get('country');
	const filterBySeason = url.searchParams.get('season');
	const filterByType = url.searchParams.get('type');
	const filterByAssists = !!url.searchParams.get('assists');
	const offset = url.searchParams.get('offset');
	const ascending = !!url.searchParams.get('ascending');

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

	if (filterByName && !filterById) {
		if (!filterByAssists) {
			query = query.or(
				`player_first_name.ilike.${filterByName},player_last_name.ilike.${filterByName}`
			);
		} else {
			query = query.or(
				`assist1_first_name.ilike.${filterByName},assist1_last_name.ilike.${filterByName},assist2_first_name.ilike.${filterByName},assist2_last_name.ilike.${filterByName}`
			);
		}
	}

	if (filterByTeam && !filterById) {
		if (filterByTeam.length === 3) {
			query = query.ilike('team_abbreviation', `%${filterByTeam}%`);
		} else {
			query = query.ilike('team_name', `%${filterByTeam}%`);
		}
	}

	if (filterByOpponent && !filterById) {
		if (filterByOpponent.length === 3) {
			query = query.ilike('opponent_abbreviation', `%${filterByOpponent}%`);
		} else {
			query = query.ilike('opponent_name', `%${filterByOpponent}%`);
		}
	}

	if (filterByNationality && !filterById) {
		if (!filterByAssists) {
			query = query.ilike('player_nationality', filterByNationality);
		} else {
			query = query.or(
				`assist1_nationality.ilike.${filterByNationality},assist2_nationality.ilike.${filterByNationality}`
			);
		}
	}

	if (filterBySeason && !filterById) {
		query = query.eq('season', parseInt(filterBySeason));
	}

	if (filterByType && !filterById) {
		query = query.eq('game_type', filterByType);
	}

	const lowerLimit = offset ? parseInt(offset) : 0;
	const numOfResults = 24;
	const upperLimit = lowerLimit + numOfResults;

	const { data, count } = await query
		.order('timestamp', { ascending })
		.range(lowerLimit, upperLimit);

	if (!data) {
		throw error(404, 'Not Found');
	}

	return new Response(
		JSON.stringify({ goals: data, count }, { headers: { 'cache-control': 'public, max-age=600' } })
	);
}
