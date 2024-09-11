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
.then(apiData => {
    const standingsSection = document.getElementById("standings");
    let standings = standingsSection.querySelector("h1");
    standings.innerHTML += ` Premier League Standings season ${apiData.parameters.season - 1} - ${apiData.parameters.season}`;
        // DOM Selection to select the element
        console.log(apiData);
        buildStandTable(apiData.response[0].league.standings[0]);

        function buildStandTable(data) {
            let table = document.getElementById("standTable");
            for (let i = 0; i < data.length; i++) {
                const row = `<tr>
                                <td>${i+1}</td>
                                <td style="text-align:left;"><img src="${data[i].team.logo}" id="logo"> ${data[i].team.name}</td>
                                <td>${data[i].all.played}</td>
                                <td>${data[i].all.win}</td>
                                <td>${data[i].all.draw}</td>
                                <td>${data[i].all.lose}</td>
                                <td>${data[i].all.goals.for}</td>
                                <td>${data[i].all.goals.against}</td>
                                <td>${data[i].goalsDiff}</td>
                                <td>${data[i].points}</td>
                            </tr>`
                table.innerHTML += row;   
            }

        }
})
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});

