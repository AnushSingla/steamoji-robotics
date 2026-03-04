import type { PageServerLoad } from './$types';
import { transformEventsForCalendar, createEventsErrorState, createEventsSuccessState } from '$lib/utils/events';

export const load: PageServerLoad = async ({ fetch }) => {
	// Load teams data - this will be streamed as a promise
	const teamsPromise = fetch('/api/teams')
		.then(res => res.json())
		.catch(error => {
			console.error('Error loading teams:', error);
			return { teams: [] };
		});

	// Load events data with transformation - this will be streamed as a promise
	const eventsPromise = fetch('/api/events')
		.then(async (res) => {
			if (!res.ok) {
				console.error('Failed to fetch events:', res.statusText);
				return createEventsErrorState(
					'Failed to load events. Please try again later.',
					res.status
				);
			}
			
			const { events: apiEvents } = await res.json();
			const calendarEvents = transformEventsForCalendar(apiEvents || []);
			return createEventsSuccessState(calendarEvents);
		})
		.catch(error => {
			console.error('Error loading events:', error);
			return createEventsErrorState(
				'Unable to load events. Please check your connection and try again.'
			);
		});

	// Load awards data - this will be streamed as a promise
	const awardsPromise = fetch('/api/awards')
		.then(res => res.json())
		.catch(error => {
			console.error('Error loading awards:', error);
			return { awards: [] };
		});

	return {
		// Return promises for streaming
		teams: teamsPromise,
		eventsState: eventsPromise,
		awards: awardsPromise
	};
};
