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
        errorEl.textContent = "Inga recept hittades för sökordet.";
        return;
    }
    // Väljer första receptet i sökresultatet.
    const recipe = data.recipes[0];
  } catch (error) {
    errorEl.textContent = "Något gick fel. Försök igen senare.";
    messageEl.textContent = "";
    console.error(error);
  }
});

