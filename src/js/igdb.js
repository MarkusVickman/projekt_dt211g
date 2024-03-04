/*JavaScript för att ladda in sidans innehåll beroende på kategori. Api-anrop vid val av kategori eller sökning. Spel från epic games store laddar in recentioner när de förstoras utifrån valt spel.
Topplista laddas in från opencritic och där kan man söka efter spelet i epic games store (dock har de ganska få spel). Tre apier används och ännu fler typer av anropsadresser.*/

"use strict"
//Variabler i global scope där spel och recentionerna ska skapas.
let buildReview = document.getElementById("review");
let bigReview = document.getElementById("big-review");
let closeByBackground = document.getElementById("big-article-background");
//Mobilmenyn är med här också för att kunna döjas när valknappar används
let menuUl = document.getElementById("menu-ul");
/*thisId används för att identifiera vilket spel som väljs, den är i global scope för att kunna välja rätt spel och för att kunna stänga identifiera vilken spelförstoring som ska stängas när klick bredvid görs*/
let thisId;

//Laddar in nycklar från en annan fil 
import { okey } from "./start";
const okej = okey();

//en eventlistener för hela body-elementet som med if-satser avgör vad som ska hända utifrån id eller class.
body.addEventListener("click", function (e) {
  /*if-sats som visar en större informationsruta av ett spel. thisId används för att visa rätt element då titeln på target är samma som id på stora elementet. En vit bakgrund visas också och är ett alternativ till stäng.*/
  if (e.target.classList.contains('biginfo') /*&& checkIfOpen === 0*/) {
    thisId = document.getElementById(e.target.title);
    thisId.style.display = "block";
    closeByBackground.style.display = "block";
    /*extra information skapas i funktionen reviewThis för att kunna hålla isär olika element, titel+ :r används för att resetta så att inte samma recension visas flera ggr. :button används av samma anledning*/
    let resetReview = document.getElementById(e.target.title + ":r");
    resetReview.innerHTML = "";

    egsSaleApi("Recension", `https://opencritic-api.p.rapidapi.com/game/search?criteria=${e.target.title}`, 'opencritic-api.p.rapidapi.com', e.target.title);
  }

  /*if-sats som visar stor recention om en recension från toplistan används */
  if (e.target.classList.contains('largerReview')) {
    thisId = document.getElementById(e.target.title);
    thisId.style.display = "block";
    closeByBackground.style.display = "block";
  }

  /*en "knapp" på hemsidan har id top-rated. När den klickas på döljs menyn om i mobilläge och hemsidan nollställs och parametrar till api-anropet skickas med till egsSaleApi funktionen*/
  if (e.target.id === "top-rated") {
    if (window.innerWidth < 800) {
      menuUl.style.display = "none";
    }
    bigReview.innerHTML = "";
    buildReview.innerHTML = "";
    egsSaleApi("Topplista hos OpenCritic", 'https://opencritic-api.p.rapidapi.com/game?platforms=pc&sort=score', 'opencritic-api.p.rapidapi.com');
  }

  /*När bakgrunden eller en stäng knapp clickas på när en recension eller spel är förstorat dölj det.*/
  if (e.target.classList.contains('close-by-button') || e.target.id === "big-article-background") {
    thisId.style.display = "none";
    closeByBackground.style.display = "none";
  }

  /*om sökknappen och input används eller en knapp i topplistans resultat används görs en spelsökning hos epic games store. Dock har de lite få spel. Api information ink. sökordet skickas med till api-anropet*/
  if (e.target.id === "search-button" || e.target.id === "searchByReview") {
    let input;
    if (e.target.id === "search-button") {
      input = document.getElementById("input-search").value;
    }
    else {
      input = e.target.title;
      closeByBackground.style.display = "none";
    }
    bigReview.innerHTML = "";
    buildReview.innerHTML = "";
    if (input.length > 1) {
      egsSaleApi("Spel hos Epic Games", `https://epic-store-games.p.rapidapi.com/onSale?searchWords=${input}&locale=sv&country=sv`, 'epic-store-games.p.rapidapi.com');
    }
  }

  /*knappar för att välja matchande/önskad recension. om recensionsknappen trycks på skickas target.id med som sökning. Target.id är ett spel id hos opencritic*/ 
  if (e.target.classList.contains('review-button')) {
    egsSaleApi("Recension av", `https://opencritic-api.p.rapidapi.com/reviews/game/${e.target.id}?sort=popularity'`, 'opencritic-api.p.rapidapi.com', e.target.id, thisId.id);
  }

  /*om knapp för kommande spel används skickas parametrar till ett api-anrop med.*/
  if (e.target.id === "comingsoon") {
    if (window.innerWidth < 800) {
      menuUl.style.display = "none";
    }
    bigReview.innerHTML = "";
    buildReview.innerHTML = "";
    egsSaleApi("Epic Games Kommande Spel", 'https://epic-store-games.p.rapidapi.com/comingSoon?locale=sv&country=sv', 'epic-store-games.p.rapidapi.com');
  }

  /*om knapp för gratisspel används skickas parametrar till ett api-anrop med.*/
  if (e.target.id === "free") {
    if (window.innerWidth < 800) {
      menuUl.style.display = "none";
    }
    bigReview.innerHTML = "";
    buildReview.innerHTML = "";
    egsSaleApi("Epic Gratis Spel och kommande gratis spel", 'https://free-epic-games.p.rapidapi.com/free', 'free-epic-games.p.rapidapi.com');
  }
})

/*funktionen som gör alla api-anrop med async await. Nykeln är en variabel i global scope. url och hostadresser skickas in i funktionen när den anropas.*/
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
    /*med hjälp av if-satser och rubrikerna som ska användas identifieras olika anrop. Argument skickas med utifrån behov*/ 
    if (header === "Recension") {
      chooseRightReview(result, title);
    }
    else if (header === "Recension av") {
      reviewThis(result, parentId);
    }
    else if (header === "Topplista hos OpenCritic") {
      buildTopList(result, header);
    }
    else {
      if(result.status === "No games found"){
        header = `Sökning på ${result.searchValue} gav inga träffar!`
      }
      buildEgs(result, header);
    }
  } catch (error) {
    console.error(error);
  }
}

/*En funktion som listar spel som matchar in på valt spel. utifrån listan kan sedan ett spel väljas.*/ 
function chooseRightReview(data, title) {
  let reviewArticle = document.getElementById(title + ":r");
  let reviewHeader = document.createTextNode("Välj matchande recension");
  let h2 = document.createElement("H2");
  h2.appendChild(reviewHeader);
  reviewArticle.appendChild(h2);
  //för att kunna rensa listan med eventlisteners ett unikt id
  let ulEl = document.createElement("ul");
  ulEl.id = title + ":button";
  //en loop för att bygga upp spellistan
  for (let i = 0; i < data.length; i++) {
    let listEl = document.createElement("li");
    let gameName = document.createTextNode(data[i].name);
    listEl.appendChild(gameName);
    listEl.id = data[i].id;
    listEl.classList.add("review-button");
    ulEl.appendChild(listEl);
  }
  reviewArticle.appendChild(ulEl);
}

/*bygger recension för önskat spel*/
function reviewThis(data, parentId) {
  /*unikt id för att kunna resta listan med eventlistener*/ 
  let reviewArticle = document.getElementById(parentId + ":r");
  let reviewHeader = document.createTextNode("Recensioner");
  let h2 = document.createElement("H2");
  h2.appendChild(reviewHeader);
  reviewArticle.appendChild(h2);
  /*5 matchande recensioner listas med en for-loop*/ 
  for (let i = 0; i < 5; i++) {

    let gameHead = document.createTextNode(data[i].game.name);
    let head = document.createElement("H3");
    head.appendChild(gameHead);

    let gameDescription = document.createTextNode(data[i].snippet);
    let textReview = document.createElement("p");
    textReview.appendChild(gameDescription);

  //formatering av betyg
  let scoreH3 = document.createElement("H3");
  let scoreText = document.createTextNode("Rating " + data[i].score + "/100 Poäng");
  scoreH3.appendChild(scoreText);

    let reviewUrl = document.createTextNode("Länk till " + data[i].Outlet.name + " i Epic games store.");
    let textUrl = document.createElement("a");
    textUrl.appendChild(reviewUrl);
    //För att alltid länk ska ges används en if-sats
    if (data[i].externalUrl !== null) {
      textUrl.setAttribute("href", data[i].externalUrl);
    } else {
      textUrl.setAttribute("href", "https://opencritic.com/");
    }
    reviewArticle.appendChild(head);
    reviewArticle.appendChild(textReview);
    reviewArticle.appendChild(scoreH3);
    reviewArticle.appendChild(textUrl);
  }
}

/*funktionen som initierar en funktion som bygger alla spel artiklar vid tryck på kommande gratis eller söker ett spel if, 
if else används för att rätt data ska byggas in då det är skilja apier och data. 2 funktioner initieras härifrån, eftersom de 
initieras för varje loop kan unika titlar och id:n skapas för varje spel i stort och litet läge och på så sätt särskilja dem åt*/
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

/*funktionen som bygger alla spel artiklar vid tryck på kommande gratis eller söker ett spel.  */
function builder(objectID) {
  let gameHeader = document.createTextNode(objectID.title);
  let h3 = document.createElement("H3");
  h3.classList.add("article-h3", "biginfo");
  let container = document.createElement("article");
  container.classList.add("article-container", "biginfo");

  let article = document.createElement("div");
  article.classList.add("article");

  let img = document.createElement("img");
  //bilderna är indexerad olika och därför loopas bilderna igenom för att hitta rätt bild.
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

/*här skapas de större elementen för spel och recensioner*/ 
function fullscreenDiv(objectID) {
  let gameHead = document.createTextNode(objectID.title);
  let head = document.createElement("H3");
  let img = document.createElement("img");
  let bigArticle = document.createElement("article");
  bigArticle.style.display = "none";
  //bilderna är indexerad olika och därför loopas bilderna igenom för att hitta rätt bild.
  for (let i = 0; i < (objectID.keyImages.length); i++) {
    if (objectID.keyImages[i].type === "OfferImageWide") {
      img.src = objectID.keyImages[i].url;
    }
  }
  let gameDescription = document.createTextNode(objectID.description);
  let text = document.createElement("p");
  text.appendChild(gameDescription);

  let gameUrl = document.createTextNode("Länk till " + objectID.title + " i Epic games store.");
  let textUrl = document.createElement("a");

  textUrl.appendChild(gameUrl);
  if (objectID.url !== null) {
    textUrl.setAttribute("href", objectID.url);
  } else {
    textUrl.setAttribute("href", "https://store.epicgames.com/");
  }
  //knapp byggs in för att kunna stänga
  let closeBtn = document.createElement("button");
  let buttonText = document.createTextNode("Stäng");
  closeBtn.appendChild(buttonText);
  closeBtn.classList.add("close-by-button", "button");

  //Div for review där id skapas för att kunna resta artikeln med eventlistener
  let reviewArticle = document.createElement("article");
  reviewArticle.id = objectID.title + ":r";
  bigArticle.appendChild(closeBtn);
  bigArticle.id = objectID.title;
  bigArticle.classList.add("big-article");
  head.appendChild(gameHead);
  bigArticle.appendChild(head);
  bigArticle.appendChild(img);
  bigArticle.appendChild(text);
  bigArticle.appendChild(textUrl);
  bigReview.appendChild(bigArticle);
  bigArticle.appendChild(reviewArticle);
}

/*som funktionen ovan fast för topplistan från open critic här ligger for-loopen i denna funktion istället för i en separat funktion som i funktionen ovan*/ 
function buildTopList(data, header) {
  let text = document.createTextNode(header);
  let h2 = document.createElement("H2");
  h2.appendChild(text);
  buildReview.appendChild(h2);
/*loopar igenom en array av object för att lista upp hela topplistan*/ 
  for (let i = 0; i < (data.length); i++) {
    let gameHeader = document.createTextNode(data[i].name);
    let h3 = document.createElement("H3");
    h3.classList.add("article-h3", "largerReview");
    let container = document.createElement("article");
    // largerReview klass för eventlistener
    container.classList.add("article-container", "largerReview");

    let article = document.createElement("div");
    article.classList.add("article");

    let img = document.createElement("img");
    img.classList.add("largerReview");
    img.src = "https://img.opencritic.com/" + data[i].images.banner.sm;

    h3.appendChild(gameHeader);
    container.appendChild(img);

    article.appendChild(container);
    article.appendChild(h3);
    buildReview.appendChild(article);
    //Titel för att kunna särskila elementen åt.
    img.title = data[i].name;
    h3.title = data[i].name;
    container.title = data[i].name;
    //varje loop skapar även element och innehåll för en störrerecension liknande funktionen "builder"
    buildBigTopList(data[i]);
  }
}

/*skapar de större recensionerna till topplistan*/ 
function buildBigTopList(data) {
  let gameHead = document.createTextNode(data.name);
  let head = document.createElement("H3");
  head.appendChild(gameHead);

  let img = document.createElement("img");
  let bigArticle = document.createElement("article");
  bigArticle.style.display = "none";

  img.src = "https://img.opencritic.com/" + data.images.banner.sm;
  //datum kortas av
  let gameRelease = document.createTextNode("Lanserings Datum: " + data.firstReleaseDate.slice(0, 10));
  let text = document.createElement("p");
  text.appendChild(gameRelease);
  //formatering av betyg
  let scoreH3 = document.createElement("H3");
  //Avrundar betyget
  let scoreText = document.createTextNode("Rating " + Math.round(data.topCriticScore) + "/100 Poäng");

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

  bigArticle.id = data.name;
  bigArticle.classList.add("big-article");
  bigArticle.appendChild(head);
  bigArticle.appendChild(img);
  bigArticle.appendChild(text);
  bigArticle.appendChild(scoreH3);
  bigArticle.appendChild(searchH3);
  bigArticle.appendChild(searchBtn);
  bigReview.appendChild(bigArticle);
}