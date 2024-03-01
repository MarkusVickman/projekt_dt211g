"use strict"
//let searchReview = document.getElementById("searchreview");
let buildReview = document.getElementById("review");
let bigReview = document.getElementById("big-review");
let checkIfOpen = 0;
let thisId;
let closeByBackground = document.getElementById("big-article-background");

import { okey } from "./start";
const okej = okey();

body.addEventListener("click", function (e) {

  if (e.target.classList.contains('biginfo') && checkIfOpen === 0) {
    thisId = document.getElementById(e.target.title);
    thisId.style.display = "block";
    closeByBackground.style.display = "block";
    egsSaleApi("Recension", `https://opencritic-api.p.rapidapi.com/game/search?criteria=${e.target.title}%203`, 'opencritic-api.p.rapidapi.com', e.target.title);
    
    checkIfOpen = 1;
    //review(thisId);
  }

  if (e.target.classList.contains('close-by-button') || e.target.id === "big-article-background") {
    thisId.style.display = "none";
    closeByBackground.style.display = "none";
    checkIfOpen = 0;
  }

  if (e.target.id === "egs-sale") {
    bigReview.innerHTML = "";
    buildReview.innerHTML = "";
    egsSaleApi("Epic Games Rea", 'https://epic-store-games.p.rapidapi.com/comingSoon?locale=sv&country=sv', 'epic-store-games.p.rapidapi.com');
  }

  if (e.target.id === "comingsoon") {
    bigReview.innerHTML = "";
    buildReview.innerHTML = "";
    egsSaleApi("Epic Games Kommande Spel", 'https://epic-store-games.p.rapidapi.com/comingSoon?locale=sv&country=sv', 'epic-store-games.p.rapidapi.com');
  }

  if (e.target.id === "free") {
    bigReview.innerHTML = "";
    buildReview.innerHTML = "";
    egsSaleApi("Epic Gratis Spel och kommande gratis spel", 'https://free-epic-games.p.rapidapi.com/free', 'free-epic-games.p.rapidapi.com');
  }
})

async function egsSaleApi(header, url, host, title) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': okej,
      'X-RapidAPI-Host': host
    }
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if(header === "Recension"){
    reviewThis(result, header, title);
    }
    else{
    buildEgs(result, header);
    }
  } catch (error) {
    console.error(error);
  }
}

function reviewThis(data, header, title) {
  console.log(title, data);
  let bigArticle = document.getElementById(title);
  let reviewHeader = document.createTextNode(header);
  let h2 = document.createElement("H2");
  h2.appendChild(reviewHeader);

  bigArticle.appendChild(h2);

  //let tempUl = document.createElement("ul");

  for(let i = 0; i < data.length; i++){
    /*let tempLi = document.createElement("li");
    let tempText = document.createTextNode(data[i].game.name);*/

  let gameHead = document.createTextNode(data.game.name);
  let head = document.createElement("H3");
  head.appendChild(gameHead);

  let gameDescription = document.createTextNode(data.snippet);
  let textReview = document.createElement("p");
  textReview.appendChild(gameDescription);

  let gameScore = document.createTextNode(data.score);
  let textScore = document.createElement("p");
  textScore.appendChild(gameScore);

  let reviewUrl = document.createTextNode("Länk till " + data.Outlet.name);
  let textUrl = document.createElement("a");
  textUrl.appendChild(reviewUrl);

  if (objectID.url !== null){
  textUrl.setAttribute("href", data.externalUrl);
  } else {
    textUrl.setAttribute("href", "https://opencritic.com/");
  }

  bigArticle.appendChild(head);
  bigArticle.appendChild(textReview);
  bigArticle.appendChild(textScore);
  bigArticle.appendChild(textUrl);
  }
    //console.log(result);
    //result.forEach((results) =>
     // console.log(results.score + results.snippet + results.game.name + results.publishedDate + results.externalUrl + results.Outlet.name));*/
}

function buildEgs(data, header) {
  //console.log(data);
  let text = document.createTextNode(header);
  let h2 = document.createElement("H2");
  h2.appendChild(text);
  buildReview.appendChild(h2);
  if (header === "Epic Games Rea" || header === "Epic Games Kommande Spel") {
    for (let i = 0; i < (data.length); i++) {
      let objectID = data[i];
      builder(objectID);
      fullscreenDiv(objectID);
    }
  }
  else if (header === "Epic Gratis Spel och kommande gratis spel") {
    for (let i = 0; i < (data.freeGames.current.length); i++) {
      let objectID = data.freeGames.current[i];
      builder(objectID);
      fullscreenDiv(objectID);
    }
    for (let i = 0; i < (data.freeGames.upcoming.length); i++) {
      let objectID = data.freeGames.upcoming[i];
      builder(objectID);
      fullscreenDiv(objectID);
    }
  }

};

function builder(objectID) {
  let gameHeader = document.createTextNode(objectID.title);
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

  for (let i = 0; i < (objectID.keyImages.length); i++) {
    if (objectID.keyImages[i].type === "OfferImageWide") {
      img.src = objectID.keyImages[i].url;
    }
  }
  img.classList.add("biginfo");

  h3.appendChild(gameHeader);
  container.appendChild(img);

  article.appendChild(container);
  article.appendChild(h3);
  buildReview.appendChild(article);

  img.title = objectID.title;
  h3.title = objectID.title;
  container.title = objectID.title;
}

function fullscreenDiv(objectID) {
  let gameHead = document.createTextNode(objectID.title);
  let head = document.createElement("H3");
  let img = document.createElement("img");
  let bigArticle = document.createElement("article");
  bigArticle.style.display = "none";

  for (let i = 0; i < (objectID.keyImages.length); i++) {
    if (objectID.keyImages[i].type === "OfferImageWide") {
      img.src = objectID.keyImages[i].url;
    }
  }

  let gameDescription = document.createTextNode(objectID.description);
  let text = document.createElement("p");
  text.appendChild(gameDescription);

  let gameUrl = document.createTextNode("Länk till " + objectID.title);
  let textUrl = document.createElement("a");

  textUrl.appendChild(gameUrl);
  if (objectID.url !== null){
  textUrl.setAttribute("href", objectID.url);
  } else {
    textUrl.setAttribute("href", "https://store.epicgames.com/");
  }
  //textUrl.textContent = "länk till " + objectID.title;

  let closeBtn = document.createElement("button");
  let buttonText = document.createTextNode("Stäng");
  closeBtn.appendChild(buttonText);
  closeBtn.classList.add("close-by-button", "button");

  bigArticle.appendChild(closeBtn);
  bigArticle.id = objectID.title;
  bigArticle.classList.add("big-article");
  //bigArticle.style.display = "none";
  head.appendChild(gameHead);
  bigArticle.appendChild(head);
  bigArticle.appendChild(img);
  bigArticle.appendChild(text);
  bigArticle.appendChild(textUrl);
  bigReview.appendChild(bigArticle);
}
/*
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

*/