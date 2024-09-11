// Import the config file
import { config } from './config.js';

// Define the API endpoint URL
const apiUrl = "https://v3.football.api-sports.io/teams/statistics?season=2022&team=42&league=39";

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
.then(statData => {
    console.log(statData);
    const statisticsSection = document.getElementById("statistics");
    let clubStats = statisticsSection.querySelector("h1");
    clubStats.innerHTML += ` <img src="${statData.response.team.logo}" id="arsenal_logo" width="50px"> ${statData.response.team.name} FC Statistics season ${statData.parameters.season - 1} - ${statData.parameters.season}`;
        // DOM Selection to select the element
        buildStatTable(statData.response);

        function buildStatTable(data) {
            let statTable = document.getElementById("statTable");
            const statNames = [data.fixtures.played, data.fixtures.wins, data.fixtures.draws, data.fixtures.loses, data.goals.for.total, data.goals.against.total, data.goals.for.average, data.goals.against.average, data.clean_sheet, data.failed_to_score];
            const attributes = ["Played", "Wins", "Draws", "Loses", "Goals For", "Goals Against","Goals For Average", "Goals Against Average", "Clean Sheet", "Failed to Score"];
            for (let i = 0; i < statNames.length; i++) {
                const row = `<tr>
                                <td style="text-align:left;">${attributes[i]}</td>
                                <td>${statNames[i].home}</td>
                                <td>${statNames[i].away}</td>
                                <td>${statNames[i].total}</td>
                             </tr>`
                statTable.innerHTML += row; 
            }
        }
})
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});
