import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	// Load teams data - this will be streamed as a promise
	const teamsPromise = fetch('/api/teams')
		.then(res => res.json())
		.catch(error => {
			console.error('Error loading teams:', error);
			return { teams: [] };
		});

	// Load events data - this will be streamed as a promise
	const eventsPromise = fetch('/api/events')
		.then(res => res.json())
		.catch(error => {
			console.error('Error loading events:', error);
			return { events: [] };
		});

	return {
		// Return promises for streaming
		teams: teamsPromise,
		events: eventsPromise
	};
};
