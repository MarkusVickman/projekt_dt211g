require('dotenv').config();

let searchReview = document.getElementById("searchreview");
let topList = document.getElementById("toplist");
let comingSoon = document.getElementById("comingsoon");
let buildReview = document.getElementById("review");
let saleEl = document.getElementById("sale");
let newReleases = document.getElementById("newreleases");

/*
import { okey } from "./start";
const okej = okey();*/

console.log(process.env.USE_THIS);


//vid click på sökknapp samlas input in och skickas vidare till apilänken
topList.addEventListener("click", function (e) {
  steam("top_sellers");
  console.log(okej);
})

//vid click på sökknapp samlas input in och skickas vidare till apilänken
saleEl.addEventListener("click", function (e) {
  steam("specials");
})

//vid click på sökknapp samlas input in och skickas vidare till apilänken
newReleases.addEventListener("click", function (e) {
  steam("newReleases");
})

//vid click på sökknapp samlas input in och skickas vidare till apilänken
comingSoon.addEventListener("click", function (e) {
  steam("comingSoon");
})


async function steam(category) {
  const url = 'https://steam-store-data.p.rapidapi.com/api/featuredcategories/';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.USE_THIS,
      'X-RapidAPI-Host': 'steam-store-data.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    //review(result);
    if (category === "top_sellers"){
    buildTopList(result);
  }
  else if(category === "specials"){
    buildSpecials(result);
  }

  else if(category === "comingSoon"){
    buildComingSoon(result);
  }

  else if(category === "newReleases"){
    buildNewReleases(result);
  }
  
  } catch (error) {
    console.error(error);
  }
}

function buildTopList(data) {

  let steamDeck = "";

  let text = document.createTextNode(data.top_sellers.name);
  let h2 = document.createElement("H2");
  h2.appendChild(text);
  buildReview.appendChild(h2);

  for (let i = 0; i < (data.top_sellers.items.length); i++) {

    if (data.top_sellers.items[i].name !== "Steam Deck") {
      let objectID = data.top_sellers.items[i];
      builder(objectID);

    } else {
      steamDeck = "yes";
      index = i;
    }
  }
  if (steamDeck === "yes") {
    let objectID = data.top_sellers.items[index];
    builder(objectID);
  }
};

function buildSpecials(data) {

  let text = document.createTextNode(data.specials.name);
  let h2 = document.createElement("H2");
  h2.appendChild(text);
  buildReview.appendChild(h2);

  for (let i = 0; i < (data.specials.items.length); i++) {
      let objectID = data.specials.items[i];
      builder(objectID);
  }
};

function buildNewReleases(data) {

  let text = document.createTextNode(data.new_releases.name);
  let h2 = document.createElement("H2");
  h2.appendChild(text);
  buildReview.appendChild(h2);

  for (let i = 0; i < (data.new_releases.items.length); i++) {
      let objectID = data.new_releases.items[i];
      builder(objectID);
  }
};

function buildComingSoon(data) {

  let text = document.createTextNode(data.coming_soon.name);
  let h2 = document.createElement("H2");
  h2.appendChild(text);
  buildReview.appendChild(h2);

  for (let i = 0; i < (data.coming_soon.items.length); i++) {
      let objectID = data.coming_soon.items[i];
      builder(objectID);
  }

  //allGameId();

};

let containerClass = document.getElementsByClassName("article-container");
/*
function allGameId(){
  for (let i = 0; i < containerClass.length; i++) {
    gameId(containerClass[i].title);
  }
}*/


function builder(objectID) {

  let gameHeader = document.createTextNode(objectID.name);
  //let text = document.createTextNode(top.top_sellers.items[i].large_capsule_image);
  let h3 = document.createElement("H3");
  h3.classList.add("article-h3", "biginfo");
  let container = document.createElement("article");
  container.classList.add("article-container", "biginfo");

  let article = document.createElement("div");
  article.classList.add("article");
  //let p = document.createElement("p");
  // p.classList.add("article-top-text");

  let img = document.createElement("img");
  img.src = objectID.large_capsule_image;
  img.classList.add("biginfo");
 

  h3.appendChild(gameHeader);
  container.appendChild(img);

  article.appendChild(container);
  article.appendChild(h3);
  buildReview.appendChild(article);

  img.title = objectID.id;
  h3.title = objectID.id;
  container.title = objectID.id;


}
/*
async function gameId(game){
  const url = `https://steam-api7.p.rapidapi.com/appDetails/${game}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': okej,
      'X-RapidAPI-Host': 'steam-api7.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    addGameInfo(result);
  } catch (error) {
    console.error(error);
  }
}*/
/*
function addGameInfo(data){
  console.log("är jag i näst sista funktionen?");
  for (let i = 0; i < containerClass.length; i++) {

    if(containerClass[i].title === data.steam_appid){
      setTimeout(function () {
      let text = document.createTextNode(data.short_description);
      let link = document.createTextNode(data.website);
      link.href = data.website;
      
      containerClass[i].appendChild(text);
      containerClass[i].appendChild(link);
    }, 5000);
    }
  }
}*/

/*
function addGameInfo(data, container){
  let text = document.createTextNode(data.short_description);
  let link = document.createTextNode(data.website);
  link.href = data.website;
  

  container.appendChild(text);
  container.appendChild(link);

}
*/

const main = document.getElementById("main");

//eventlistener för hela main-innehållet
main.addEventListener("click", function (e) {
 
  if (e.target.classList.contains('biginfo')) {
      alert(e.target.title);
  }
})

async function review(games) {
  let game = games.top_sellers.items[1].name;
  // let game = games.featured_win[0].name;
  console.log(game);
  const url = `https://opencritic-api.p.rapidapi.com/game/search?criteria=${game}%203`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.USE_THIS,
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

//let listHere = document.getElementById("review"); 

async function reviewThis(review) {
  const url = `https://opencritic-api.p.rapidapi.com/reviews/game/${review}?sort=newest`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.USE_THIS,
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
