<script lang="ts">
	// @ts-nocheck
	import { Calendar, DayGrid } from '@event-calendar/core';
	import '@event-calendar/core/index.css';
	import GlassPanel from './GlassPanel.svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import ErrorState from './ErrorState.svelte';
	import type { EventsLoadingState } from '$lib/utils/events';

	interface Props {
		eventsState?: EventsLoadingState;
	}

	let { eventsState }: Props = $props();

	// Sample VEX V5 Robotics events as fallback
	const sampleEvents = [
		{
			id: 1,
			title: 'VEX V5 Competition - Regional Qualifiers',
			start: '2025-08-15',
			end: '2025-08-15',
			allDay: true,
			backgroundColor: '#2f3691',
			textColor: '#ffffff',
			extendedProps: {
				type: 'competition',
				location: 'Central High School',
				description: 'Regional competition to qualify for state championships'
			}
		},
		{
			id: 2,
			title: 'Team Meeting - Strategy Session',
			start: '2025-08-20',
			end: '2025-08-20',
			allDay: true,
			backgroundColor: '#f8cb47',
			textColor: '#2f3691',
			extendedProps: {
				type: 'meeting',
				location: 'Steamoji Lab',
				description: 'Weekly team meeting to discuss upcoming competition strategies'
			}
		},
		{
			id: 3,
			title: 'State Championship Tournament',
			start: '2025-08-26',
			end: '2025-08-28',
			allDay: true,
			backgroundColor: '#dc2328',
			textColor: '#ffffff',
			extendedProps: {
				type: 'championship',
				location: 'State Convention Center',
				description: '3-day state championship tournament - our biggest event of the year!'
			}
		}
	];

	// Determine which events to use
	let displayEvents = $derived(() => {
		if (eventsState && !eventsState.isLoading && !eventsState.error) {
			return eventsState.events.length > 0 ? eventsState.events : sampleEvents;
		}
		return sampleEvents;
	});

	// Calendar options with dark theme and glassmorphism styling
	let calendar;
	
	// Function to handle navigation
	function goToPrevious() {
		if (calendar) {
			calendar.prev();
		}
	}
	
	function goToNext() {
		if (calendar) {
			calendar.next();
		}
	}
	
	function goToToday() {
		if (calendar) {
			calendar.setOption('date', new Date());
		}
	}
	
	let options = $derived({
		view: 'dayGridMonth',
		events: displayEvents(),
		height: '700px',
		firstDay: 0, // Sunday
		headerToolbar: {
			start: 'title',
			center: '',
			end: ''
		},
		footerToolbar: false, // Disable default footer, we'll use custom
		eventClick: function(info) {
			const event = info.event;
			const props = event.extendedProps;
			
			// Format the alert message
			let message = `${event.title}\n\n`;
			if (props.type) message += `Type: ${props.type}\n`;
			if (props.location) message += `Location: ${props.location}\n`;
			if (props.description) message += `Description: ${props.description}\n`;
			if (props.teams && props.teams.length > 0) {
				message += `Teams: ${props.teams.join(', ')}\n`;
			}
			if (props.program) message += `Program: ${props.program}\n`;
			
			// Add date information
			if (event.allDay) {
				if (event.start && event.end) {
					const startDate = new Date(event.start);
					const endDate = new Date(event.end);
					if (startDate.toDateString() === endDate.toDateString()) {
						message += `\nDate: ${startDate.toLocaleDateString()}`;
					} else {
						message += `\nDates: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
					}
				}
			} else {
				message += `\nTime: ${event.start.toLocaleString()} - ${event.end.toLocaleString()}`;
			}
			
			alert(message);
		},
		dayMaxEvents: 3,
		moreLinkContent: function(args) {
			return `+${args.num} more events`;
		},
		theme: function(theme) {
			return {
				...theme,
				calendar: 'ec ec-dark steamoji-calendar',
				toolbar: 'ec-toolbar steamoji-toolbar',
				button: 'ec-button steamoji-button',
				buttonGroup: 'ec-button-group steamoji-button-group',
				event: 'ec-event steamoji-event',
				day: 'ec-day steamoji-day',
				dayHead: 'ec-day-head steamoji-day-head',
				today: 'ec-today steamoji-today'
			};
		}
	});

	// Function to retry loading events (for error state)
	function retryLoading() {
		// Trigger a page reload to retry the server-side loading
		window.location.reload();
	}
</script>

{#if eventsState?.isLoading}
	<GlassPanel class="p-6 steamoji-calendar-container">
		<div class="calendar-loading">
			<LoadingSpinner />
			<p class="text-center text-gray-300 mt-4">Loading calendar events...</p>
		</div>
	</GlassPanel>
{:else if eventsState?.error}
	<GlassPanel class="p-6 steamoji-calendar-container">
		<ErrorState 
			title="Unable to Load Events"
			message={eventsState.error.message}
			onRetry={retryLoading}
		/>
	</GlassPanel>
{:else}
	<GlassPanel class="p-6 steamoji-calendar-container">
		<div class="calendar-wrapper">
			<Calendar bind:this={calendar} plugins={[DayGrid]} {options} />
			<!-- Custom footer with navigation buttons -->
			<div class="custom-footer-toolbar">
				<div class="footer-button-group">
					<button class="steamoji-button nav-button" onclick={goToPrevious}>‹</button>
					<button class="steamoji-button nav-button" onclick={goToNext}>›</button>
				</div>
				<button class="steamoji-button today-button" onclick={goToToday}>Today</button>
			</div>
		</div>
	</GlassPanel>
{/if}

<style>
	.calendar-loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 400px;
	}

	:global(.steamoji-calendar) {
		background: transparent !important;
		color: #ffffff !important;
		border: none !important;
		font-family: 'ui-sans-serif', 'system-ui', sans-serif !important;
	}

	:global(.steamoji-toolbar) {
		background: rgba(255, 255, 255, 0.05) !important;
		backdrop-filter: blur(16px) !important;
		border: 1px solid rgba(255, 255, 255, 0.1) !important;
		border-radius: 12px !important;
		padding: 16px 20px !important;
		margin-bottom: 16px !important;
		display: flex !important;
		align-items: center !important;
		justify-content: center !important;
	}

	/* Custom footer toolbar */
	.custom-footer-toolbar {
		background: rgba(255, 255, 255, 0.05) !important;
		backdrop-filter: blur(16px) !important;
		border: 1px solid rgba(255, 255, 255, 0.1) !important;
		border-radius: 12px !important;
		padding: 16px 20px !important;
		margin-top: 16px !important;
		display: flex !important;
		align-items: center !important;
		justify-content: space-between !important;
	}

	.footer-button-group {
		display: flex !important;
		align-items: center !important;
		gap: 12px !important;
	}

	.nav-button {
		min-width: 40px !important;
		width: 40px !important;
		height: 40px !important;
		border-radius: 50% !important;
		padding: 0 !important;
		font-size: 1.2rem !important;
		font-weight: 700 !important;
		display: flex !important;
		align-items: center !important;
		justify-content: center !important;
	}

	.today-button {
		font-size: 0.875rem !important;
		padding: 10px 16px !important;
	}

	/* Footer toolbar for mobile-friendly navigation */
	:global(.ec-footer),
	:global(.ec-footer .ec-toolbar) {
		background: rgba(255, 255, 255, 0.05) !important;
		backdrop-filter: blur(16px) !important;
		border: 1px solid rgba(255, 255, 255, 0.1) !important;
		border-radius: 12px !important;
		padding: 16px 20px !important;
		margin-top: 16px !important;
		display: flex !important;
		align-items: center !important;
		justify-content: space-between !important;
	}

	:global(.ec-footer .ec-button-group) {
		display: flex !important;
		align-items: center !important;
		gap: 12px !important;
	}

	:global(.ec-toolbar .ec-button-group) {
		display: flex !important;
		align-items: center !important;
		gap: 12px !important;
	}

	:global(.steamoji-button) {
		background: rgba(248, 203, 71, 0.9) !important;
		color: #2f3691 !important;
		border: none !important;
		border-radius: 8px !important;
		padding: 10px 16px !important;
		font-weight: 600 !important;
		font-size: 0.875rem !important;
		transition: all 0.3s ease !important;
		backdrop-filter: blur(4px) !important;
		min-width: 44px !important;
		height: 40px !important;
		display: flex !important;
		align-items: center !important;
		justify-content: center !important;
	}

	:global(.steamoji-button:hover) {
		background: rgba(248, 203, 71, 1) !important;
		transform: translateY(-1px) !important;
		box-shadow: 0 4px 12px rgba(248, 203, 71, 0.3) !important;
	}

	:global(.steamoji-button.ec-active) {
		background: rgba(47, 54, 145, 0.9) !important;
		color: #ffffff !important;
	}

	:global(.steamoji-day) {
		background: rgba(255, 255, 255, 0.03) !important;
		border: 1px solid rgba(255, 255, 255, 0.1) !important;
		transition: all 0.3s ease !important;
	}

	:global(.steamoji-day:hover) {
		background: rgba(255, 255, 255, 0.08) !important;
		border-color: rgba(248, 203, 71, 0.3) !important;
	}

	:global(.steamoji-day-head) {
		background: rgba(47, 54, 145, 0.15) !important;
		color: #ffffff !important;
		font-weight: 600 !important;
		text-transform: uppercase !important;
		font-size: 0.75rem !important;
		letter-spacing: 0.05em !important;
		padding: 8px 4px !important;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
		text-align: center !important;
		min-height: auto !important;
		height: 32px !important;
		display: flex !important;
		align-items: center !important;
		justify-content: center !important;
	}

	:global(.steamoji-today) {
		background: rgba(248, 203, 71, 0.1) !important;
		border-color: rgba(248, 203, 71, 0.5) !important;
	}

	:global(.steamoji-today .steamoji-day-head) {
		background: rgba(248, 203, 71, 0.2) !important;
		color: #2f3691 !important;
	}

	:global(.steamoji-event) {
		border-radius: 6px !important;
		border: none !important;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
		font-size: 0.75rem !important;
		font-weight: 500 !important;
		transition: all 0.3s ease !important;
		backdrop-filter: blur(4px) !important;
	}

	:global(.steamoji-event:hover) {
		transform: translateY(-1px) !important;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
		z-index: 10 !important;
	}

	:global(.ec-day-grid .ec-day) {
		min-height: 100px !important;
	}

	:global(.ec-day-grid .ec-event) {
		margin: 2px 4px !important;
		padding: 4px 8px !important;
	}

	:global(.ec-title) {
		color: #ffffff !important;
		font-size: 1.5rem !important;
		font-weight: 700 !important;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
		text-align: center !important;
		flex: 1 !important;
		margin: 0 20px !important;
	}

	:global(.ec-day-foot a) {
		color: rgba(248, 203, 71, 0.9) !important;
		text-decoration: none !important;
		font-weight: 600 !important;
		font-size: 0.75rem !important;
		padding: 2px 6px !important;
		border-radius: 4px !important;
		background: rgba(47, 54, 145, 0.3) !important;
		transition: all 0.3s ease !important;
	}

	:global(.ec-day-foot a:hover) {
		background: rgba(248, 203, 71, 0.2) !important;
		color: #ffffff !important;
	}

	:global(.steamoji-calendar-container) {
		background: rgba(255, 255, 255, 0.05) !important;
		backdrop-filter: blur(16px) !important;
		border: 1px solid rgba(255, 255, 255, 0.1) !important;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
	}

	.calendar-wrapper {
		border-radius: 12px;
		overflow-x: auto;
		overflow-y: hidden;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: thin;
		scrollbar-color: rgba(248, 203, 71, 0.3) transparent;
	}

	.calendar-wrapper::-webkit-scrollbar {
		height: 8px;
	}

	.calendar-wrapper::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 4px;
	}

	.calendar-wrapper::-webkit-scrollbar-thumb {
		background: rgba(248, 203, 71, 0.3);
		border-radius: 4px;
	}

	.calendar-wrapper::-webkit-scrollbar-thumb:hover {
		background: rgba(248, 203, 71, 0.5);
	}

	/* Enable horizontal scrolling on mobile */
	@media (max-width: 768px) {
		:global(.ec-day-grid) {
			min-width: 600px !important;
		}
		
		:global(.steamoji-calendar) {
			min-width: 600px !important;
		}
		
		:global(.ec-header) {
			min-width: 600px !important;
		}
		
		:global(.ec-days) {
			min-width: 600px !important;
		}
	}

	/* Fix spacing for navigation buttons */
	:global(.ec-toolbar .ec-button-group:first-child) {
		display: flex !important;
		align-items: center !important;
		gap: 12px !important;
	}

	:global(.ec-toolbar .ec-button-group:last-child) {
		display: flex !important;
		align-items: center !important;
		gap: 12px !important;
	}

	/* Ensure proper button sizing for prev/next */
	:global(.ec-button[aria-label*="Previous"]),
	:global(.ec-button[aria-label*="Next"]) {
		min-width: 40px !important;
		width: 40px !important;
		height: 40px !important;
		border-radius: 50% !important;
		padding: 0 !important;
		font-size: 1rem !important;
		font-weight: 700 !important;
	}

	/* Style the header container */
	:global(.ec-header) {
		background: transparent !important;
		border: none !important;
		padding: 0 !important;
	}

	/* Fix day headers row */
	:global(.ec-days) {
		background: transparent !important;
		border: none !important;
	}
</style>
