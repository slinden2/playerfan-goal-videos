import { createClient } from '@supabase/supabase-js';

export const handle = async ({ event, resolve }) => {
	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	event.locals.supabase = supabase;
	const response = await resolve(event);
	return response;
};
