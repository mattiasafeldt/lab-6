"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Mattias Åfeldt
 */

const searchFormEl = document.querySelector("#searchform");
const searchInputEl = document.querySelector("#search");
const errorEl = document.querySelector("#error");
const recipeEl = document.querySelector("#recipe");
const messageEl = document.querySelector("#message");

// Event listener för formuläret
searchFormEl.addEventListener("submit", async function (event) {
  // Hanterar sökning i formuläret utan att sidan laddas om.  
  event.preventDefault();
  // Visar felmeddelande om formuläret är tomt, annars loggas sökordet i konsolen.
  const searchTerm = searchInputEl.value.trim();
  errorEl.textContent = "";
  messageEl.textContent = "";
  if (searchTerm === "") {
    errorEl.textContent = "Skriv in ett sökord!";
    return;
  }
  // Hämtar recept från API:et med hjälp av fetch och async/await, samt visar eventuella fel.
  try {
    // Omvandlar API-svarets JSON-data till ett JavaScript-objekt.
    const response = await fetch('https://dummyjson.com/recipes/search?q=' + searchTerm);
    //Visar felmeddelande och avbryter om inget recept hittas.
    if (!response.ok) {
        throw new Error("Kunde inte hämta recept");
    }
    const data = await response.json();
    if (data.recipes.length === 0) {
        messageEl.textContent = "Inga recept hittades för sökordet.";
        return;
    }
    // Väljer första receptet i sökresultatet.
    const recipe = data.recipes[0];
    showRecipe(recipe);
  } catch (error) {
    messageEl.textContent = "Något gick fel. Försök igen senare.";
    console.error(error);
  }
});

// Funktion som visar receptets namn och bild på sidan.
function showRecipe(recipe) {
    let recipeEl = document.querySelector("#recipe");
    recipeEl.replaceChildren(); // Rensar tidigare recept

    //Skapar ett nytt article-element med receptets namn och bild.
    let article = document.createElement("article");
    let heading = document.createElement("h3");
    heading.textContent = recipe.name;
    let image = document.createElement("img");
    image.src = recipe.image;
    image.alt = recipe.name;

    article.appendChild(heading);
    article.appendChild(image);
    recipeEl.appendChild(article);
}


