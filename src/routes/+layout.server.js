import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	const {
		data,
		error: sbError,
		status,
		statusText
	} = await locals.supabase.from('players').select().order('last_name', { ascending: true });

	if (sbError) {
		throw error(status, {
			message: statusText
		});
	}

	if (status === 200) {
		return {
			players: data
		};
	}

	throw error(404, {
		message: 'Not Found'
	});
}
