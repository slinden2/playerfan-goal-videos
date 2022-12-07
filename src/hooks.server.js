import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';

export const handle = async ({ event, resolve }) => {
	const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
	event.locals.supabase = supabase;
	const response = await resolve(event);
	return response;
};
