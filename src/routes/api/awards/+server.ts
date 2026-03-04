import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const fetchAwardsForTeam = async (teamRid: string) => {
    try {
        const response = await fetch(`https://www.robotevents.com/api/v2/teams/${teamRid}/awards`, {
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
        return data.data;
    } catch (error) {
        console.error('Error fetching awards:', error);
        return [];
    }
};

export const GET: RequestHandler = async ({ fetch }) => {
    try {
        // Fetch teams from the teams API
        const teamsResponse = await fetch('/api/teams');
        if (!teamsResponse.ok) {
            throw new Error(`Failed to fetch teams: ${teamsResponse.statusText}`);
        }
        const { teams } = await teamsResponse.json();

        // Fetch events to get end dates for awards
        const eventsResponse = await fetch('/api/events');
        if (!eventsResponse.ok) {
            throw new Error(`Failed to fetch events: ${eventsResponse.statusText}`);
        }
        const { events } = await eventsResponse.json();

        const awards = [];

        // Fetch awards for each team
        for (const team of teams) {
            const teamAwards = await fetchAwardsForTeam(team.rid);
            for (const award of teamAwards) {
                const event = events.find((e: { id: any; }) => e.id === award.event.id);
                const dateEnd = event?.end || award.event.end || new Date().toISOString();
                
                awards.push({
                    team: team.id,
                    date: dateEnd,
                    event: award.event.name,
                    title: award.title
                });
            }
        }

        // Sort awards by date
        awards.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return json({ awards }, { status: 200 });
    } catch (error) {
        console.error('Error fetching awards:', error);
        return json({ error: 'Failed to fetch awards' }, { status: 500 });
    }
};
