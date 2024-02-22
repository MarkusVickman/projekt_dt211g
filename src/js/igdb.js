//

//https://www.uhr.se/api/antagningsstatistik/searchTotal?searchfor=&searchterm=HT23&searchkategori=&pagesize=5000&page=1&tillfalle=urv2

/*hämtar sökord från inputfält och visar bästa resultat som en markör på en openstreetkarta. Koordinater hämtas med fetch api av söktjänsten nominatim och openstreetmap*/
//https://nominatim.openstreetmap.org/search?addressdetails=1&q=mittuniversitetet&format=jsonv2&limit=1

let searchBtn = document.getElementById("searchbtn");
let chooseTerm = document.getElementById("chooseterm");

//vid click på sökknapp samlas input in och skickas vidare till.
searchBtn.addEventListener("click", function (e) {
    let search = document.getElementById("searchinput").value;
    fetchData(search);
})


//vid click på sökknapp samlas input in och skickas vidare till apilänken
chooseTerm.addEventListener("click", function (e) {
    let termin = document.getElementById("term").value;
    fetchData(termin);
})

/* En asynkron funktion som väntar på datan som hämtas som array av object med fetch api. Hämtar data med hjälp av nominatim sökfunktion och använder sökordet från sidan*/
async function fetchData(termin) {
    try {
        const response = await fetch(`https://www.uhr.se/api/antagningsstatistik/searchTotal?searchfor=&searchterm=${termin}&pagesize=30000`);
        let data = await response.json();
        filterStatistics(data);
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

function filterStatistics(data){
    
}



/* En asynkron funktion som väntar på datan som hämtas som array av object med fetch api. Hämtar data med hjälp av nominatim sökfunktion och använder sökordet från sidan
async function fetchData(search) {
    try {
        const response = await fetch('https://nominatim.openstreetmap.org/search?addressdetails=1&q=' + search + '&format=jsonv2&limit=1');
        let data = await response.json();
        writeToMap(data);
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}*/

/*Tar datan och extraherar värden för kordinater för både latitude, longitude och boundingboxex. Skriver ut adressen till iframen för kartan.
function writeToMap(coordinates) {
    let lat = coordinates[0].lat;
    let lon = coordinates[0].lon;
    let boxLat1 = coordinates[0].boundingbox[0];
    let boxLat2 = coordinates[0].boundingbox[1];
    let boxLon1 = coordinates[0].boundingbox[2];
    let boxLon2 = coordinates[0].boundingbox[3];

    document.getElementById("outputmap").src = ("https://www.openstreetmap.org/export/embed.html?bbox=" + boxLon1 + "%2C" + boxLat1 + "%2C" + boxLon2 + "%2C" + boxLat2 + "&layer=mapnik&marker=" + lat + "%2C" + lon);
}*/
