// Event transformation utilities for the calendar component

export interface APIEvent {
	id: string;
	name: string;
	start: string;
	end: string;
	location?: {
		venue?: string;
		address_1?: string;
		city?: string;
		region?: string;
	};
	teams?: string[];
	program?: {
		code?: string;
	};
}

export interface CalendarEvent {
	id: string | number;
	title: string;
	start: string;
	end: string;
	allDay: boolean;
	backgroundColor: string;
	textColor: string;
	extendedProps: {
		type: string;
		location: string;
		description: string;
		teams?: string[];
		program?: string;
	};
}

// Predefined color palette for events
const EVENT_COLORS = [
	{ bg: '#2f3691', text: '#ffffff' }, // Dark blue
	{ bg: '#f8cb47', text: '#2f3691' }, // Yellow
	{ bg: '#dc2328', text: '#ffffff' }, // Red
	{ bg: '#ee7295', text: '#ffffff' }, // Pink
	{ bg: '#4caf50', text: '#ffffff' }, // Green
	{ bg: '#ff9800', text: '#ffffff' }, // Orange
	{ bg: '#9c27b0', text: '#ffffff' }, // Purple
	{ bg: '#00bcd4', text: '#ffffff' }, // Cyan
	{ bg: '#607d8b', text: '#ffffff' }, // Blue grey
	{ bg: '#8bc34a', text: '#ffffff' }, // Light green
];

// Cache for consistent colors per event ID
const colorCache = new Map<string, { bg: string; text: string }>();

/**
 * Get a consistent random color for an event based on its ID
 */
function getEventColor(eventId: string): { bg: string; text: string } {
	if (colorCache.has(eventId)) {
		return colorCache.get(eventId)!;
	}
	
	// Use event ID to generate a consistent index
	let hash = 0;
	for (let i = 0; i < eventId.length; i++) {
		const char = eventId.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash = hash & hash; // Convert to 32-bit integer
	}
	
	const colorIndex = Math.abs(hash) % EVENT_COLORS.length;
	const color = EVENT_COLORS[colorIndex];
	
	colorCache.set(eventId, color);
	return color;
}

/**
 * Format location information from API event
 */
function formatEventLocation(location?: APIEvent['location']): string {
	if (!location) return 'Location TBD';
	
	const parts = [];
	if (location.venue) parts.push(location.venue);
	if (location.city && location.region) {
		parts.push(`${location.city}, ${location.region}`);
	} else if (location.city) {
		parts.push(location.city);
	} else if (location.region) {
		parts.push(location.region);
	}
	
	return parts.length > 0 ? parts.join(' - ') : 'Location TBD';
}

/**
 * Generate event description
 */
function generateEventDescription(event: APIEvent): string {
	const parts = [];
	
	if (event.program?.code) {
		parts.push(`Program: ${event.program.code}`);
	}
	
	if (event.teams && event.teams.length > 0) {
		const teamText = event.teams.length === 1 ? 'team' : 'teams';
		parts.push(`Participating ${teamText}: ${event.teams.join(', ')}`);
	}
	
	if (parts.length === 0) {
		parts.push('VEX Robotics Competition Event');
	}
	
	return parts.join(' • ');
}

/**
 * Transform API events to calendar format
 */
export function transformEventsForCalendar(apiEvents: APIEvent[]): CalendarEvent[] {
	return apiEvents.map((event) => {
		const color = getEventColor(event.id);
		const location = formatEventLocation(event.location);
		const description = generateEventDescription(event);
		
		// Convert to all-day events by using just the date part
		const startDate = new Date(event.start);
		const endDate = new Date(event.end);
		
		// Format as YYYY-MM-DD for all-day events
		const startDateOnly = startDate.toISOString().split('T')[0];
		const endDateOnly = endDate.toISOString().split('T')[0];
		
		return {
			id: event.id,
			title: event.name,
			start: startDateOnly,
			end: endDateOnly,
			allDay: true,
			backgroundColor: color.bg,
			textColor: color.text,
			extendedProps: {
				type: 'competition',
				location,
				description,
				teams: event.teams,
				program: event.program?.code,
			},
		};
	});
}

/**
 * Error state for events loading
 */
export interface EventsError {
	message: string;
	status?: number;
}

/**
 * Loading state interface
 */
export interface EventsLoadingState {
	isLoading: boolean;
	error?: EventsError;
	events: CalendarEvent[];
}

/**
 * Create initial loading state
 */
export function createInitialEventsState(): EventsLoadingState {
	return {
		isLoading: true,
		events: [],
	};
}

/**
 * Create error state
 */
export function createEventsErrorState(message: string, status?: number): EventsLoadingState {
	return {
		isLoading: false,
		error: { message, status },
		events: [],
	};
}

/**
 * Create success state
 */
export function createEventsSuccessState(events: CalendarEvent[]): EventsLoadingState {
	return {
		isLoading: false,
		events,
	};
}
