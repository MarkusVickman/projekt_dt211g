//

//https://www.uhr.se/api/antagningsstatistik/searchTotal?searchfor=&searchterm=HT23&searchkategori=&pagesize=5000&page=1&tillfalle=urv2

/*hämtar sökord från inputfält och visar bästa resultat som en markör på en openstreetkarta. Koordinater hämtas med fetch api av söktjänsten nominatim och openstreetmap*/
//https://nominatim.openstreetmap.org/search?addressdetails=1&q=mittuniversitetet&format=jsonv2&limit=1

let searchBtn = document.getElementById("searchbtn");
let chooseTerm = document.getElementById("chooseterm");
let picturesEl = document.getElementById("pictures");
/*vid click på sökknapp samlas input in och skickas vidare till.
searchBtn.addEventListener("click", function (e) {
    let search = document.getElementById("searchinput").value;
    fetchData(search);
})*/


//vid click på sökknapp samlas input in och skickas vidare till apilänken
chooseTerm.addEventListener("click", function (e) {
  //let termin = document.getElementById("term").value;
  // const test = "IMik8AYqRWK_A4OQI6OGGDUNA2_8vELenWSbcG-5PQk"; 
  //fetchData(test);
  steam();
})

/*
unsplash.search.photos("explore", 1, 1);

{
  "total": 3451,
  "total_pages": 3451,
  "results": [
    {
      "id": "eOLpJytrbsQ",
      "created_at": "2014-11-18T14:35:36-05:00",
      "width": 4000,
      "height": 3000,
      "color": "#A7A2A1",
      "likes": 286,
      "user": {
        "id": "Ul0QVz12Goo",
        "username": "ugmonk",
        "name": "Jeff Sheldon",
        "first_name": "Jeff",
        "last_name": "Sheldon",
        "portfolio_url": "http://ugmonk.com/",
        "profile_image": {
          "small": "https://images.unsplash.com/profile-1441298803695-accd94000cac?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=7cfe3b93750cb0c93e2f7caec08b5a41",
          "medium": "https://images.unsplash.com/profile-1441298803695-accd94000cac?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=5a9dc749c43ce5bd60870b129a40902f",
          "large": "https://images.unsplash.com/profile-1441298803695-accd94000cac?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=32085a077889586df88bfbe406692202"
        },
        "links": {
          "self": "https://api.unsplash.com/users/ugmonk",
          "html": "http://unsplash.com/@ugmonk",
          "photos": "https://api.unsplash.com/users/ugmonk/photos",
          "likes": "https://api.unsplash.com/users/ugmonk/likes"
        }
      },
      "urls": {
        "raw": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f",
        "full": "https://hd.unsplash.com/photo-1416339306562-f3d12fefd36f",
        "regular": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=92f3e02f63678acc8416d044e189f515",
        "small": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=263af33585f9d32af39d165b000845eb",
        "thumb": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=8aae34cf35df31a592f0bef16e6342ef"
      },
      "links": {
        "self": "https://api.unsplash.com/photos/eOLpJytrbsQ",
        "html": "http://unsplash.com/photos/eOLpJytrbsQ",
        "download": "http://unsplash.com/photos/eOLpJytrbsQ/download"
      }
    }
  ]
}
*/


/*
async function fetchData(testKey) {
    try {
        const response = `https://api.unsplash.com/photos/?client_id=${testKey}`;
        let data = await response;
        console.log(data);
        for (let i = 0; i < 9; i++){
            console.log(data[i].urls.full);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }

}*/

async function steam() {
  const url = 'https://steam-store-data.p.rapidapi.com/api/featuredcategories/';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e3d155d42emsh852328865208c68p121582jsn7bf3e51f8039',
      'X-RapidAPI-Host': 'steam-store-data.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    review(result);
  } catch (error) {
    console.error(error);
  }

}

async function review(games) {
  let game = games.top_sellers.items[1].name;
  // let game = games.featured_win[0].name;
  console.log(game);
  const url = `https://opencritic-api.p.rapidapi.com/game/search?criteria=${game}%203`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e3d155d42emsh852328865208c68p121582jsn7bf3e51f8039',
      'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    let review = result[0].id;
    reviewThis(review);
  } catch (error) {
    console.error(error);
  }
}

let listHere = document.getElementById("review"); 

async function reviewThis(review) {
  const url = `https://opencritic-api.p.rapidapi.com/reviews/game/${review}?sort=newest`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e3d155d42emsh852328865208c68p121582jsn7bf3e51f8039',
      'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    document.getElementById("review").innerHTML = result; 
    console.log(result);
    result.forEach((results) => 
    console.log(results.score + results.snippet + results.game.name + results.publishedDate + results.externalUrl + results.Outlet.name));
    
  } catch (error) {
    console.error(error);
  }
}


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
//async function fetchData(url ="https://api.skolverket.se/planned-educations/v3/adult-education-events", data = {}) {
// Default options are marked with *
//    const response = await fetch(url, {
//      method: "GET", // *GET, POST, PUT, DELETE, etc.
//     mode: "no-cors", // no-cors, *cors, same-origin
/*cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
credentials: "same-origin", // include, *same-origin, omit*/
//      headers: {
//       "Content-Type": "application/json",
//     "accept": "application/vnd.skolverket.plannededucations.api.v3.hal+json",
//      },
/*redirect: "follow", // manual, *follow, error
referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url*/
//   });
//return response.json(); // parses JSON response into native JavaScript objects

//  console.log(data);
//   console.log(response);
// }
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
