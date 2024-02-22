//Hämtar spelinformation från igdb med fetch api POST och använde steam api för att se om spelet finns hos steam

"use strict"

fetchIdgb();

async function fetchIdgb() {

    /*try {
        const response = await fetch('https://id.twitch.tv/oauth2/token');
        let data = await response.json();
        writeToMap(data);
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }*/

    try {
        fetch('https://id.twitch.tv/oauth2/token', {
            method: "post",
            headers: {
                client_id: "ksudckxxzsfe1fpdwpf9x2vu884o5x",
                client_secret: "jrtylbg4lc6elt2ugtfzaoe7h6pmdv",
                grant_type: "client_credentials"
            },

            //make sure to serialize your JSON body
            /*body: JSON.stringify({
                name: myName,
                password: myPassword
            })*/
        })
            .then((response) => {
                let res = response.json();
                console.log(res);
                //showGames(token);
            });

    }
    catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

let gameInfo = document.getElementById("info");

function showGames(token) {
    try {
        fetch('https://api.igdb.com/v4/games', {
            method: "post",
            headers: {
                client_id: ksudckxxzsfe1fpdwpf9x2vu884o5x,
                Authorization: Bearer + token,
                Body: "fields *;"
            },

            //make sure to serialize your JSON body
            /*body: JSON.stringify({
                name: myName,
                password: myPassword
            })*/
        })
            .then((response) => {
                console.log(response.json());
                showGames();
            });
    }
    catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
//https://id.twitch.tv/oauth2/token