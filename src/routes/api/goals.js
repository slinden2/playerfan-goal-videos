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
player:player_id!inner(
  id,
  first_name,
  last_name,
  nationality,
  position,
  jersey_number,
  link,
  img_link
),
team:team_id!inner(
  id,
  name,
  abbreviation,
  link,
  logo_link
),
opponent:opponent_id!inner(
  id,
  name,
  abbreviation,
  link,
  logo_link
)
`;

export async function GET({ locals, url }) {
	const filterByName = url.searchParams.get('name');
	const filterByTeam = url.searchParams.get('for');
	const filterByOpponent = url.searchParams.get('against');
	const filterByNationality = url.searchParams.get('country');
	const offset = url.searchParams.get('offset');

	let query = locals.supabase.from('goals').select(FIELDS);

	if (filterByName) {
		query = query.or(`first_name.ilike.${filterByName},last_name.ilike.${filterByName}`, {
			foreignTable: 'player'
		});
	}

	if (filterByTeam) {
		query = query.ilike('team.name', `%${filterByTeam}%`);
	}

	if (filterByOpponent) {
		query = query.ilike('opponent.name', `%${filterByOpponent}%`);
	}

	if (filterByNationality) {
		query = query.ilike('player.nationality', filterByNationality);
	}

	const lowerLimit = offset ? parseInt(offset) : 0;
	const numOfResults = 24;

	const { data, error } = await query
		.order('timestamp', { ascending: false })
		.range(lowerLimit, lowerLimit + numOfResults);

	return new Promise((resolve, reject) => {
		if (data) {
			resolve({
				headers: {
					'cache-control': 'public, max-age=600'
				},
				status: 200,
				body: { goals: data }
			});
		} else {
			reject({
				status: 404,
				error
			});
		}
	});
}
