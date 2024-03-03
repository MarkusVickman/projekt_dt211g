"use strict"
//let searchReview = document.getElementById("searchreview");  
let buildReview = document.getElementById("review");
let bigReview = document.getElementById("big-review");
let checkIfOpen = 0;
let thisId;
let closeByBackground = document.getElementById("big-article-background");
let searchDiv = document.getElementById("search-div");

let menuUl = document.getElementById("menu-ul");

import { okey } from "./start";
const okej = okey();

body.addEventListener("click", function (e) {

  if (e.target.classList.contains('biginfo') && checkIfOpen === 0) {
    thisId = document.getElementById(e.target.title);
    thisId.style.display = "block";
    closeByBackground.style.display = "block";
    //Bygger reset för recensioner i stor visning
    let resetReview = e.target.title + ":r";
    document.getElementById(resetReview).innerHTML = "";
    let resetReviewButton = e.target.title + ":button";
    if (document.getElementById(resetReviewButton) !== null) {
      document.getElementById(resetReviewButton).innerHTML = "";
    }

    egsSaleApi("Recension", `https://opencritic-api.p.rapidapi.com/game/search?criteria=${e.target.title}`, 'opencritic-api.p.rapidapi.com', e.target.title);

    checkIfOpen = 1;
    //review(thisId);
  }

  if (e.target.classList.contains('largerReview')){
    thisId = document.getElementById(e.target.title);
    thisId.style.display = "block";
    closeByBackground.style.display = "block";
  }

  //ska bygga stor info av recensioner.
  //vid val av recention stängs rutan och en sökning på egs görs.

  if (e.target.id === "top-rated") {
    if (window.innerWidth < 800) {
      menuUl.style.display = "none";
    }

    bigReview.innerHTML = "";
    buildReview.innerHTML = "";

    egsSaleApi("Årets Topplista", 'https://opencritic-api.p.rapidapi.com/game/hall-of-fame', 'opencritic-api.p.rapidapi.com');
  }


  if (e.target.classList.contains('close-by-button') || e.target.id === "big-article-background") {
    thisId.style.display = "none";
    closeByBackground.style.display = "none";
    checkIfOpen = 0;
  }

  if (e.target.id === "search-button" || e.target.id === "searchByReview") {
    /*if (window.innerWidth < 800) {
      menuUl.style.display = "none";
    }*/
    let input;

    if(e.target.id === "search-button"){
    input = document.getElementById("input-search").value;
    }
    else {
      input = e.target.title;
      closeByBackground.style.display = "none";
    }

    bigReview.innerHTML = "";
    buildReview.innerHTML = "";
    egsSaleApi("Spel hos Epic Games", `https://epic-store-games.p.rapidapi.com/onSale?searchWords=${input}&locale=sv&country=sv`, 'epic-store-games.p.rapidapi.com');
  }

  if (e.target.classList.contains('review-button')) {
    /*thisId = document.getElementById(e.target.title);
    thisId.style.display = "block";
    closeByBackground.style.display = "block";*/
    //let reviewArticle = document.getElementById(parentId + ":r");

    egsSaleApi("Recension av", `https://opencritic-api.p.rapidapi.com/reviews/game/${e.target.id}?sort=popularity'`, 'opencritic-api.p.rapidapi.com', e.target.id, thisId.id);

    //review(thisId);
  }

  if (e.target.id === "comingsoon") {
    if (window.innerWidth < 800) {
      menuUl.style.display = "none";
    }
    bigReview.innerHTML = "";
    buildReview.innerHTML = "";
    egsSaleApi("Epic Games Kommande Spel", 'https://epic-store-games.p.rapidapi.com/comingSoon?locale=sv&country=sv', 'epic-store-games.p.rapidapi.com');
  }

  if (e.target.id === "free") {
    if (window.innerWidth < 800) {
      menuUl.style.display = "none";
    }
    bigReview.innerHTML = "";
    buildReview.innerHTML = "";
    egsSaleApi("Epic Gratis Spel och kommande gratis spel", 'https://free-epic-games.p.rapidapi.com/free', 'free-epic-games.p.rapidapi.com');
  }

  if (e.target.id === 'search-review') {
    /*if (window.innerWidth < 800) {
      menuUl.style.display = "none";
    }*/
    bigReview.innerHTML = "";
    buildReview.innerHTML = "";
    searchDiv.style.display = "block";
    //egsSaleApi("Sök Recension", `https://opencritic-api.p.rapidapi.com/game/hall-of-fame`, 'opencritic-api.p.rapidapi.com');
  }

  /*if (e.target.id === 'search-div' || e.target.id === 'search-close') {
    searchDiv.style.display = "none";
  }*/
})

async function egsSaleApi(header, url, host, title, parentId) {
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
    if (header === "Recension") {
      chooseRightReview(result, title);
    }
    else if (header === "Recension av") {
      reviewThis(result, header, title, parentId);
    }
    else if (header === "Årets Topplista") {
      buildTopList(result, header);
    }
    else {
      buildEgs(result, header);
    }
  } catch (error) {
    console.error(error);
  }
}

function chooseRightReview(data, title) {
  let bigArticle = document.getElementById(title);
  let reviewHeader = document.createTextNode("Välja matchande recension");
  let h2 = document.createElement("H2");
  h2.appendChild(reviewHeader);
  bigArticle.appendChild(h2);

  let ulEl = document.createElement("ul");
  ulEl.id = title + ":button";

  for (let i = 0; i < data.length; i++) {
    let listEl = document.createElement("li");
    let gameName = document.createTextNode(data[i].name);
    listEl.appendChild(gameName);
    listEl.id = data[i].id;
    listEl.classList.add("review-button");

    ulEl.appendChild(listEl);
  }

  bigArticle.appendChild(ulEl);
}

//Lägg till liten article, för recentionstopplista. loopar och if satser för att skapa och skilja ut.


function reviewThis(data, header, title, parentId) {
  console.log(/*title, data*/ parentId);
  let reviewArticle = document.getElementById(parentId + ":r");
  let reviewHeader = document.createTextNode("Recentioner");
  let h2 = document.createElement("H2");
  h2.appendChild(reviewHeader);

  reviewArticle.appendChild(h2);

  //let tempUl = document.createElement("ul");

  for (let i = 0; i < data.length; i++) {

    let gameHead = document.createTextNode(data[i].game.name);
    let head = document.createElement("H3");
    head.appendChild(gameHead);

    let gameDescription = document.createTextNode(data[i].snippet);
    let textReview = document.createElement("p");
    textReview.appendChild(gameDescription);

    let gameScore = document.createTextNode(data[i].score);
    let textScore = document.createElement("p");
    textScore.appendChild(gameScore);

    let reviewUrl = document.createTextNode("Länk till " + data[i].Outlet.name);
    let textUrl = document.createElement("a");
    textUrl.appendChild(reviewUrl);

    if (data[i].externalUrl !== null) {
      textUrl.setAttribute("href", data[i].externalUrl);
    } else {
      textUrl.setAttribute("href", "https://opencritic.com/");
    }

    reviewArticle.appendChild(head);
    reviewArticle.appendChild(textReview);
    reviewArticle.appendChild(textScore);
    reviewArticle.appendChild(textUrl);
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
  if (header === "Spel hos Epic Games" || header === "Epic Games Kommande Spel") {
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

function buildTopList(data, header) {

  let text = document.createTextNode(header);
  let h2 = document.createElement("H2");
  h2.appendChild(text);
  buildReview.appendChild(h2);

  for (let i = 0; i < (data.length); i++) {

    let gameHeader = document.createTextNode(data[i].name);
    //let text = document.createTextNode(top.top_sellers.items[i].large_capsule_image);
    let h3 = document.createElement("H3");
    h3.classList.add("article-h3", "largerReview");
    let container = document.createElement("article");
    container.classList.add("article-container", "largerReview");

    let article = document.createElement("div");
    article.classList.add("article");
    //let p = document.createElement("p");
    // p.classList.add("article-top-text");  https://img.opencritic.com/

    let img = document.createElement("img");
    img.classList.add("largerReview");

    img.src = "https://img.opencritic.com/" + data[i].images.banner.sm;

    h3.appendChild(gameHeader);
    container.appendChild(img);

    article.appendChild(container);
    article.appendChild(h3);
    buildReview.appendChild(article);

    img.title = data[i].name;
    h3.title = data[i].name;
    container.title = data[i].name;

    buildBigTopList(data[i]);
  }
}



function buildBigTopList(data){
  let gameHead = document.createTextNode(data.name);
  let head = document.createElement("H3");
  head.appendChild(gameHead);

  let img = document.createElement("img");
  let bigArticle = document.createElement("article");
  bigArticle.style.display = "none";

  img.src = "https://img.opencritic.com/" + data.images.banner.sm;

  let shortReleaseDate = truncateReleaseDate(data.firstReleaseDate, 10);

  let gameRelease = document.createTextNode("Lanserings Datum: " + shortReleaseDate);
  let text = document.createElement("p");
  text.appendChild(gameRelease);

  let scoreH3 = document.createElement("H3");
  let scoreText = document.createTextNode("Rating " + data.topCriticScore + "/100 Poäng");
  scoreH3.appendChild(scoreText);

  let searchH3 = document.createElement("H5");
  let searchText = document.createTextNode("Sök spelet i Epic Games Store. Det är tyvärr ganska vanligt att de senaste spelen inte finns med i deras butik.");
  searchH3.appendChild(searchText);

  let searchBtn = document.createElement("button");
  let buttonText = document.createTextNode("Sök");
  searchBtn.appendChild(buttonText);
  searchBtn.classList.add("button");
  searchBtn.id = "searchByReview";
  searchBtn.title = data.name;

  /*
  //Div for review
  let reviewArticle = document.createElement("article");
  reviewArticle.id = objectID.title + ":r";
  bigArticle.appendChild(reviewArticle);
*/


  bigArticle.id = data.name;
  bigArticle.classList.add("big-article");
  //bigArticle.style.display = "none";
  bigArticle.appendChild(head);

  bigArticle.appendChild(img);
  bigArticle.appendChild(text);
  bigArticle.appendChild(scoreH3);
  bigArticle.appendChild(searchH3);
  bigArticle.appendChild(searchBtn);
  bigReview.appendChild(bigArticle);
  //bigArticle.appendChild(reviewArticle);
}

function truncateReleaseDate(str, num) {
  return str;
}

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
  if (objectID.url !== null) {
    textUrl.setAttribute("href", objectID.url);
  } else {
    textUrl.setAttribute("href", "https://store.epicgames.com/");
  }
  //textUrl.textContent = "länk till " + objectID.title;

  let closeBtn = document.createElement("button");
  let buttonText = document.createTextNode("Stäng");
  closeBtn.appendChild(buttonText);
  closeBtn.classList.add("close-by-button", "button");

  //Div for review
  let reviewArticle = document.createElement("article");
  reviewArticle.id = objectID.title + ":r";
  bigArticle.appendChild(reviewArticle);


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
  bigArticle.appendChild(reviewArticle);
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