//

//https://www.uhr.se/api/antagningsstatistik/searchTotal?searchfor=&searchterm=HT23&searchkategori=&pagesize=5000&page=1&tillfalle=urv2

/*hämtar sökord från inputfält och visar bästa resultat som en markör på en openstreetkarta. Koordinater hämtas med fetch api av söktjänsten nominatim och openstreetmap*/
//https://nominatim.openstreetmap.org/search?addressdetails=1&q=mittuniversitetet&format=jsonv2&limit=1

let searchBtn = document.getElementById("searchbtn");
let chooseTerm = document.getElementById("chooseterm");

/*vid click på sökknapp samlas input in och skickas vidare till.
searchBtn.addEventListener("click", function (e) {
    let search = document.getElementById("searchinput").value;
    fetchData(search);
})*/


//vid click på sökknapp samlas input in och skickas vidare till apilänken
chooseTerm.addEventListener("click", function (e) {
    //let termin = document.getElementById("term").value;
    fetchData();
})

/* En asynkron funktion som väntar på datan som hämtas som array av object med fetch api. Hämtar data med hjälp av nominatim sökfunktion och använder sökordet från sidan*/
/*async function fetchData(termin) {
    try {
        const response = curl -X "https://api.skolverket.se/planned-educations/v3/compact-school-units?coordinateSystemType=WGS84&page=0&size=20" -H "accept: application/vnd.skolverket.plannededucations.api.v3.hal+json";
        let data = await response.json();
        filterStatistics(data);
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}*/

    /*curl -X GET https://api.skolverket.se/planned-educations/v3/compact-school-units?coordinateSystemType=WGS84&page=0&size=20
    -H "accept: application/vnd.skolverket.plannededucations.api.v3.hal+json";*/

    // Example POST method implementation:
async function fetchData(url ="https://api.skolverket.se/planned-educations/v3/adult-education-events", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "no-cors", // no-cors, *cors, same-origin
      cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "accept": "application/vnd.skolverket.plannededucations.api.v3.hal+json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

    });
    //return response.json(); // parses JSON response into native JavaScript objects
    console.log(response);

    console.log(data);
  }
  /*
  postData("https://example.com/answer", { answer: 42 }).then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
  });*/


/*
function filterStatistics(data){
    console.log(data);
}
*/


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
