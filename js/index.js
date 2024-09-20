// Import the config file
import { config } from './config.js';

// Define the API endpoint URL
const apiUrl = "https://v3.football.api-sports.io/standings?league=39&season=2022";

// Set up the API request headers with the correct 'x-apisports-key'
const headers = {
    'x-apisports-key': config.apiKey,
    'Accept': 'application/json',
};

// Make the API request using the fetch method
fetch(apiUrl, {
    method: 'GET',
    headers: headers
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(clubData => {
    const clubSection = document.getElementById("clubs");
    let club = clubSection.querySelector("h1");
    club.innerHTML += `Premier League Clubs season ${clubData.parameters.season - 1} - ${clubData.parameters.season}`;
        // DOM Selection to select the element
        console.log(clubData);
        buildClubTable(clubData.response[0].league.standings[0]);

        function buildClubTable(data) {
            let table = document.getElementById("clubTable");
            for (let i = 0; i < data.length; i++) {
                const row = `<tr>
                                <td style="text-align:left;"><img src="${data[i].team.logo}" id="logo"> ${data[i].team.name}</td>
                            </tr>`
                table.innerHTML += row;   
            }

        }
})
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});

