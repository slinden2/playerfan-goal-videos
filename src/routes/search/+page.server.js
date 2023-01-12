import { error } from '@sveltejs/kit';
import { getCountryName } from '$lib/utils/getCountryName';

export async function load({ locals }) {
	const seasonResponse = await locals.supabase
		.from('season_view')
		.select()
		.order('season', { ascending: true });

	const teamResponse = await locals.supabase
		.from('teams')
		.select('id, name')
		.order('name', { ascending: true });

	const nationalityResponse = await locals.supabase
		.from('nationality_view')
		.select('nationality')
		.order('nationality', { ascending: true });

	if (seasonResponse.error) {
		throw error(seasonResponse.status, { message: seasonResponse.statusText });
	}

	if (teamResponse.error) {
		throw error(teamResponse.status, { message: teamResponse.statusText });
	}

	if (nationalityResponse.error) {
		throw error(nationalityResponse.status, { message: nationalityResponse.statusText });
	}

	const seasons = seasonResponse.data.map((item) => {
		const year = item.season;
		const nextYear = year + 1;
		return { id: item, name: `${year}-${nextYear}` };
	});

	const nationalities = nationalityResponse.data.map((item) => {
		const countryName = getCountryName(item.nationality);
		return { id: item.nationality, name: countryName };
	});

	if (
		seasonResponse.status === 200 &&
		teamResponse.status === 200 &&
		nationalityResponse.status === 200
	) {
		return {
			seasons,
			teams: teamResponse.data,
			nationalities
		};
	}

	throw error(404, {
		message: 'Not Found'
	});
}

export const actions = {
	default: async ({ request }) => {
		console.log(await request.formData());
	}
};
