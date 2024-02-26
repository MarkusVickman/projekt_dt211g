

let searchBtn = document.getElementById("searchbtn");
let chooseTerm = document.getElementById("chooseterm");
let picturesEl = document.getElementById("pictures");


//vid click på sökknapp samlas input in och skickas vidare till apilänken
chooseTerm.addEventListener("click", function (e) {

  steam();
})

import { okey } from "./start";
const okej = okey();

async function steam() {
  const url = 'https://steam-store-data.p.rapidapi.com/api/featuredcategories/';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': okej,
      'X-RapidAPI-Host': 'steam-store-data.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    review(result);
    buildPage(result);
  } catch (error) {
    console.error(error);
  }

}

function buildPage(){
  
}

async function review(games) {
  let game = games.top_sellers.items[1].name;
  // let game = games.featured_win[0].name;
  console.log(game);
  const url = `https://opencritic-api.p.rapidapi.com/game/search?criteria=${game}%203`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': okej,
      'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    let review = result[0].id;
    //reviewThis(review);
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
      'X-RapidAPI-Key': okej,
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
