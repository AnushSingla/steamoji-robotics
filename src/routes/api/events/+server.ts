// src/routes/api/events.ts
import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

// Fetch events data from VEX Robotics API
const fetchEventsForTeam = async (teamRid: string) => {
    try {
        const response = await fetch(`https://www.robotevents.com/api/v2/teams/${teamRid}/events`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + env.SECRET_APIKEY
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data; // Return the events data
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
};

export const GET: RequestHandler = async ({ fetch }) => {
    try {
        // Fetch teams from your existing API
        const teamsResponse = await fetch('/api/teams'); // Use event.fetch to get teams
        if (!teamsResponse.ok) {
            throw new Error(`Failed to fetch teams: ${teamsResponse.statusText}`);
        }
        const { teams } = await teamsResponse.json();

        const eventsMap: { [key: string]: any } = {}; // To store events by event ID

        // Fetch events for each team
        for (const team of teams) {
            const teamEvents = await fetchEventsForTeam(team.rid);
            for (const event of teamEvents) {
                if (eventsMap[event.id]) {
                    // If the event already exists, add the team to the teams array
                    eventsMap[event.id].teams.push(team.id);
                } else {
                    // If the event does not exist, create a new entry
                    eventsMap[event.id] = {
                        ...event,
                        teams: [team.id] // Initialize with the current team's name
                    };
                }
            }
        }

        // Convert the eventsMap to an array
        const eventsArray = Object.values(eventsMap);

        // Sort events by start date
        eventsArray.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

        return json({ events: eventsArray }, { status: 200 });
    } catch (error) {
        console.error('Error fetching teams or events:', error);
        return json({ error: 'Failed to fetch events' }, { status: 500 });
    }
};
