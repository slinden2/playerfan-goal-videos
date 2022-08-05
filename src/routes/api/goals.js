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
		filterByName || filterByTeam || filterByOpponent || filterByNationality ? 'exact' : 'estimated';
	let query = locals.supabase.from('goal_view').select(FIELDS, { count: countType });

	if (filterByName) {
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

	if (filterByTeam) {
		if (filterByTeam.length === 3) {
			query = query.ilike('team_abbreviation', `%${filterByTeam}%`);
		} else {
			query = query.ilike('team_name', `%${filterByTeam}%`);
		}
	}

	if (filterByOpponent) {
		if (filterByOpponent.length === 3) {
			query = query.ilike('opponent_abbreviation', `%${filterByOpponent}%`);
		} else {
			query = query.ilike('opponent_name', `%${filterByOpponent}%`);
		}
	}

	if (filterByNationality) {
		if (!filterByAssists) {
			query = query.ilike('player_nationality', filterByNationality);
		} else {
			query = query.or(
				`assist1_nationality.ilike.${filterByNationality},assist2_nationality.ilike.${filterByNationality}`
			);
		}
	}

	if (filterBySeason) {
		query = query.eq('season', parseInt(filterBySeason));
	}

	if (filterByType) {
		query = query.eq('game_type', filterByType);
	}

	const lowerLimit = offset ? parseInt(offset) : 0;
	const numOfResults = 24;
	const upperLimit = lowerLimit + numOfResults;

	const { data, error, count } = await query
		.order('timestamp', { ascending })
		.range(lowerLimit, upperLimit);

	return new Promise((resolve, reject) => {
		if (data) {
			resolve({
				headers: {
					'cache-control': 'public, max-age=600'
				},
				status: 200,
				body: { goals: data, count }
			});
		} else {
			reject({
				status: 404,
				error
			});
		}
	});
}
