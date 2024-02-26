

let searchBtn = document.getElementById("searchbtn");
let chooseTerm = document.getElementById("chooseterm");
let picturesEl = document.getElementById("pictures");
let buildReview = document.getElementById("review");
let buildFeatured = document.getElementById("toplist");
let build = document.getElementById("");

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
    //review(result);
    buildPage(result);
  } catch (error) {
    console.error(error);
  }

}

function buildPage(top) {
  let steamDeck = "";
  for (let i = 0; i < (top.top_sellers.items.length); i++) {

    if (top.top_sellers.items[i].name !== "Steam Deck") {
      builder(i, top);
    } else {
      steamDeck = "yes";
      index = i;
    }
  }
  if (steamDeck === "yes") {
    builder(index, top);
  }
};

function builder(i, top) {
  let gameHeader = document.createTextNode(top.top_sellers.items[i].name);
  //let text = document.createTextNode(top.top_sellers.items[i].large_capsule_image);
  let h3 = document.createElement("H3");
  h3.classList.add("article-h3");
  let container = document.createElement("article");
  container.classList.add("article-container");

  let article = document.createElement("div");
  article.classList.add("article");
  //let p = document.createElement("p");
  // p.classList.add("article-top-text");

  let img = document.createElement("img");
  img.src = top.top_sellers.items[i].large_capsule_image;


  h3.appendChild(gameHeader);
  container.appendChild(h3);
  container.appendChild(img);
  buildReview.appendChild(container);


  buildReview.title = top.top_sellers.items[i].id;
}


//console.log(top.top_sellers.items.length);

/*let header = document.createTextNode("Bokningsnr: " + key);
let ul = document.createElement("ul");
let h3 = document.createElement("h3");
h3.appendChild(header);
ul.appendChild(h3);
//Varje "key-värdes array" loopas igenom och en lista byggs upp.
for (let i = 0; i < value.length; i++) {
    let li = document.createElement("li");
    let text = document.createTextNode(value[i]);
    li.appendChild(text);
    ul.appendChild(li);
}

//Knappar skapas för att avboka eller omboka resa. Även här sparas bokningsnummret in som titel för att senare kunna tabort rätt resa.
let cancel = document.createElement("button");
cancel.classList.add("cancel_btn");
cancel.title = key;
let cancelText = document.createTextNode("Avboka");
let rebook = document.createElement("button");
rebook.title = key;
rebook.href = "book_travel.html";
rebook.classList.add("rebook_btn");
let rebookText = document.createTextNode("Omboka resa");
cancel.appendChild(cancelText);
rebook.appendChild(rebookText);
cancel.classList.add("red");
//här skapas en container för varje bokning inklusive knappar och rubrik som skapas.
let div = document.createElement("div");
div.classList.add("box_auto_height");
div.classList.add("lightgreen_border");
div.appendChild(ul);
div.appendChild(cancel);
div.appendChild(rebook);*/

/*För att lägga bokningen till rätt färdig element på sidan startar bokningsnummret(=key) på olika bokstäver och det kontrolleras med if och else if.*/
/*if (key.charAt(0) == "t") {
    writeTravel.appendChild(div);
}

else if (key.charAt(0) == "r") {
    writeRecurring.appendChild(div);
}
}
}*/


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

//let listHere = document.getElementById("review"); 

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
