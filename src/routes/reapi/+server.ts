import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { put } from '@vercel/blob'

const teams = [
    {
        id: '1523C',
        rid: '000000',
        name: 'Steamoji Team',
        location: 'Bellevue, WA',
        description: 'Steamoji Team',
        members: [
            { name: 'Allen Zhang', grade: '9th' },
            { name: 'Devank De', grade: '9th' },
            { name: 'Alyssa Li', grade: '9th' },
            { name: 'Max Wu', grade: '9th' },
            { name: 'Rishabh Rao ', grade: '9th' },
            { name: 'Kaihan Yang', grade: '9th' },
            { name: 'Krish Rao', grade: '9th' }
        ],
        robot: {
            name: 'Steamoji Robot'
        },
    },
    {
        id: '1523W',
        rid: '000000',
        name: 'Steamoji Team',
        location: 'Bellevue, WA',
        description: 'Steamoji Team',
        members: [
            { name: 'Runchen Wu', grade: '11th' },
            { name: 'Jash Vohra', grade: '11th' },
            { name: 'Dhruv Iyengar', grade: '12th' },
            { name: 'Kirkland Cheng', grade: '12th' },
            { name: 'Aarav Attre', grade: '12th' },
            { name: 'Bryan Ma', grade: '10th' },
            { name: 'Ayush Agarwal', grade: '11th' },
            { name: 'Murali Chengavala', grade: '12th' },
            { name: 'Arvind Srinivasan', grade: '12th' }
        ],
        robot: {
            name: 'Steamoji Robot'
        },
    },
    {
        id: '1523X',
        rid: '000000',
        name: 'Steamoji Team',
        location: 'Bellevue, WA',
        description: 'Steamoji Team',
        members: [
            { name: 'Luna', grade: '9th' },
            { name: 'Milan Kuruvilla', grade: '8th' },
            { name: 'Pratham', grade: '9th' },
            { name: 'Rishit Kharbanda', grade: '8th' },
            { name: 'Sameen', grade: '9th' },
            { name: 'Sean', grade: '9th' }
        ],
        robot: {
            name: 'Steamoji Robot'
        },
    },
    {
        id: '1523Z',
        rid: '000000',
        name: 'Steamoji Team',
        location: 'Bellevue, WA',
        description: 'Steamoji Team',
        achievements: [
        ],
        members: [
            { name: 'Pranav Dowluru', grade: '9th' },
            { name: 'Ahriyen Kamran', grade: '9th' },
            { name: 'Terence Hui', grade: '9th' },
            { name: 'Jonathan', grade: '9th' },
            { name: 'Max Chandra', grade: '9th' },
            { name: 'Aarav Desai', grade: '9th' }
        ],
        robot: {
            name: 'Steamoji Robot'
        },
    }
];

const fetchTeamsData = async () => {
    try {
        const teamIds = teams.map((team) => team.id).join('&number[]=');
        const response = await fetch(
            `https://www.robotevents.com/api/v2/teams?number[]=${teamIds}&myTeams=false`,
            {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + env.SECRET_APIKEY
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.data.length > 0) {
            return teams.map((team) => {
                const fetchedTeam = data.data.find((t: { number: string }) => t.number === team.id);
                if (fetchedTeam) {
                    return {
                        id: fetchedTeam.number,
                        rid: fetchedTeam.id,
                        name: fetchedTeam.team_name || 'Default Team Name',
                        location: `${fetchedTeam.location.city}, ${fetchedTeam.location.region}` || 'Default Location',
                        members: team.members,
                        robot: {
                            name: fetchedTeam.robot_name || 'Steamoji Robot'
                        },
                    };
                }
                return team;
            });
        }
    } catch (error) {
        console.error('Error fetching team data:', error);
        return teams; // Return original teams in case of error
    }
};

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
        return data.data; // Return the events data
    } catch (error) {
        console.error('Error fetching awards:', error);
        return [];
    }
};

export const POST: RequestHandler = async () => {
    //TEAMS PUT
    const updatedTeams = await fetchTeamsData();
    const teamObj = { teams: updatedTeams };
    const teamsBlob = await put('teamsdata.json', JSON.stringify(teamObj), { access: 'public', allowOverwrite: true, token: "vercel_blob_rw_qJQcH1PquTKXrxtd_ISsyc3RFCNcyYu7B5i7pWlnjRhHD3C" });

    //EVENTS PUT
    const eventsMap: { [key: string]: any } = {}; // To store events by event ID

    if (updatedTeams) {
        for (const team of updatedTeams) {
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
    }
    // Convert the eventsMap to an array
    const eventsArray = Object.values(eventsMap);

    // Sort events by start date
    eventsArray.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

    const eventsObj = { events: eventsArray };
    const eventsBlob = await put('eventsdata.json', JSON.stringify(eventsObj), { access: 'public', allowOverwrite: true, token: "vercel_blob_rw_qJQcH1PquTKXrxtd_ISsyc3RFCNcyYu7B5i7pWlnjRhHD3C" });

    let awards = [];

    // Fetch events for each team
    if (updatedTeams) {
        for (const teamIter of updatedTeams) {
            const teamAwards = await fetchAwardsForTeam(teamIter.rid);
            for (const award of teamAwards) {
                let eventReq = await fetch('/api/events')
                let { events } = await eventReq.json()
                const dateEnd = events.find((e: { id: any; }) => e.id == award.event.id).end
                awards.push({
                    team: teamIter.id,
                    date: dateEnd,
                    event: award.event.name,
                    title: award.title
                })
            }
        }
    }

    // Sort events by start date
    awards.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    let awardsObj = { awards: awards };
    const awardsBlob = await put('awardsdata.json', JSON.stringify(awardsObj), { access: 'public', allowOverwrite: true, token: "vercel_blob_rw_qJQcH1PquTKXrxtd_ISsyc3RFCNcyYu7B5i7pWlnjRhHD3C" });

    return json(null, { status: 200 });
};
