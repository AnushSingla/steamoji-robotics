import type { PageServerLoad } from './$types';
import { transformEventsForCalendar, createEventsErrorState, createEventsSuccessState } from '$lib/utils/events';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		// Load events data with error handling
		const eventsResponse = await fetch('/api/events');
		
		if (!eventsResponse.ok) {
			console.error('Failed to fetch events:', eventsResponse.statusText);
			return {
				eventsState: createEventsErrorState(
					'Failed to load events. Please try again later.',
					eventsResponse.status
				)
			};
		}
		
		const { events: apiEvents } = await eventsResponse.json();
		const calendarEvents = transformEventsForCalendar(apiEvents || []);
		
		return {
			eventsState: createEventsSuccessState(calendarEvents)
		};
	} catch (error) {
		console.error('Error loading events:', error);
		return {
			eventsState: createEventsErrorState(
				'Unable to load events. Please check your connection and try again.'
			)
		};
	}
};
