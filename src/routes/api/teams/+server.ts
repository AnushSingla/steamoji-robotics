// src/routes/api/teams.ts
import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import posthog from 'posthog-js';

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

const teams = [
    {
        id: '1523C',
        rid: '000000',
        name: 'Steamoji Team',
        location: 'Bellevue, WA',
        description: 'Steamoji Team',
        achievements: [],
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
        color: 'yellow',
        type: 'V5'
    },
        {
        id: '1523E',
        rid: '000000',
        name: 'Steamoji Team',
        location: 'Bellevue, WA',
        description: 'Steamoji Team',
        achievements: [],
            members: [
                { name: 'Vikram', grade: '8th' },
                { name: 'Mateya', grade: '8th' },
                { name: 'Laksh', grade: '8th' },
                { name: 'Mingming', grade: '8th' },
                { name: 'Aaron', grade: '8th' },
                { name: 'Lam', grade: '8th' },
                { name: 'Shuhan', grade: '8th' },
                { name: 'Ananya', grade: '8th' }
            ],
        robot: {
            name: 'Steamoji Robot'
        },
        color: 'purple',
        type: 'V5'
    },
    {
        id: '1523W',
        rid: '000000',
        name: 'Steamoji Team',
        location: 'Bellevue, WA',
        description: 'Steamoji Team',
        achievements: [],
        members: [
            { name: 'Runchen Wu', grade: '11th' },
            { name: 'Jash Vohra', grade: '11th' },
            { name: 'Dhruv Iyengar', grade: '12th' },
            { name: 'Kirkland Cheng', grade: '12th' },
            { name: 'Aarav Attre', grade: '12th' },
            { name: 'Bryan Ma', grade: '10th' },
            { name: 'Ayush Agarwal', grade: '11th' },
            { name: 'Chandan Chengavala', grade: '12th' },
            { name: 'Arvind Srinivasan', grade: '12th' }
        ],
        robot: {
            name: 'Steamoji Robot'
        },
        color: 'pink',
        type: 'V5'
    },
    {
        id: '1523X',
        rid: '000000',
        name: 'Steamoji Team',
        location: 'Bellevue, WA',
        description: 'Steamoji Team',
        achievements: [],
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
        color: 'yellow',
        type: 'V5'
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
            { name: 'Pranav Dowluru', grade: '8th' },
            { name: 'Ahriyen Kamran', grade: '8th' },
            { name: 'Terence Hu', grade: '8th' },
            { name: 'Jonathan', grade: '8th' },
            { name: 'Max Chandra', grade: '7th' },
            { name: 'Aarav Desai', grade: '8th' }
        ],
        robot: {
            name: 'Steamoji Robot'
        },
        color: 'yellow',
        type: 'V5'
    },
    {
        id: '16630A',
        rid: '000000',
        name: 'Steamoji A Team',
        location: 'Steamoji Redmond',
        description: 'VEX IQ Team',
        achievements: [],
        members: [],
        robot: {
            name: 'IQ Robot'
        },
        color: 'yellow',
        type: 'IQ'
    },
    {
        id: '16630B',
        rid: '000000',
        name: 'Steamoji B Team',
        location: 'Steamoji Redmond',
        description: 'VEX IQ Team',
        achievements: [],
        members: [],
        robot: {
            name: 'IQ Robot'
        },
        color: 'red',
        type: 'IQ'
    },
    {
        id: '16630C',
        rid: '000000',
        name: 'Steamoji C Team',
        location: 'Steamoji Redmond',
        description: 'VEX IQ Team',
        achievements: [],
        members: [],
        robot: {
            name: 'IQ Robot'
        },
        color: 'pink',
        type: 'IQ'
    },
    {
        id: '16630D',
        rid: '000000',
        name: 'Steamoji D Team',
        location: 'Steamoji Redmond',
        description: 'VEX IQ Team',
        achievements: [],
        members: [],
        robot: {
            name: 'IQ Robot'
        },
        color: 'purple',
        type: 'IQ'
    },
    {
        id: '16630E',
        rid: '000000',
        name: 'Steamoji E Team',
        location: 'Steamoji Redmond',
        description: 'VEX IQ Team',
        achievements: [],
        members: [],
        robot: {
            name: 'IQ Robot'
        },
        color: 'yellow',
        type: 'IQ'
    }
];

//Fetch teams data from VEX Robotics API
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
        
        // Always return all teams, enriched with API data if available
        const enrichedTeams = await Promise.all(teams.map(async (team) => {
            const fetchedTeam = data && data.data && data.data.length > 0 
                ? data.data.find((t: { number: string }) => t.number === team.id)
                : null;
            
            // Fetch awards for this team
            const teamRid = fetchedTeam ? fetchedTeam.id : team.rid;
            const awards = await fetchAwardsForTeam(teamRid);
            const achievements = awards.map((award: any) => `${award.title} - ${award.event.name}`);
            
            if (fetchedTeam) {
                return {
                    id: fetchedTeam.number,
                    rid: fetchedTeam.id,
                    name: fetchedTeam.team_name || team.name,
                    location: `${fetchedTeam.location.city}, ${fetchedTeam.location.region}` || team.location,
                    members: team.members,
                    robot: {
                        name: fetchedTeam.robot_name || team.robot.name
                    },
                    color: team.color,
                    achievements: achievements,
                    type: team.type
                };
            }
            // Return original team data if not found in API or API failed, but with awards
            return {
                ...team,
                achievements: achievements
            };
        }));
        
        return enrichedTeams;
    } catch (error) {
        console.error('Error fetching team data:', error);
        return teams; // Return original teams in case of error
    }
};

export const GET: RequestHandler = async () => {
    const updatedTeams = await fetchTeamsData();
    return json({ teams: updatedTeams }, { status: 200 });
};