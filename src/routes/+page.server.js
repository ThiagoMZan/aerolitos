import { lucia } from '$lib/server/lucia';

export const load = async (event) => {
	const { user } = event.locals;

	return {
		user
	};
};