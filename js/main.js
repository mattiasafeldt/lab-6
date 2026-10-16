"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Mattias Åfeldt
 */

// Hämtar element från DOM.
const searchFormEl = document.querySelector("#searchform");
const searchInputEl = document.querySelector("#search");
const errorEl = document.querySelector("#error");
const recipeEl = document.querySelector("#recipe");
const messageEl = document.querySelector("#message");

// Event listener för formuläret som kontrollerar sökordet, hanterar eventuella fel och hämtar recept från API:et.
searchFormEl.addEventListener("submit", async function (event) {
  // Hanterar sökning i formuläret utan att sidan laddas om.  
  event.preventDefault();
  // Visar felmeddelande om formuläret är tomt och tar bort mellanslag i början och i slutet.
  const searchTerm = searchInputEl.value.trim();
  errorEl.textContent = "";
  messageEl.textContent = "";
  if (searchTerm === "") {
    errorEl.textContent = "Skriv in ett sökord!";
    return;
  }
  //Tar bort tidigare recept från sidan vid en ny sökning.
  document.querySelector("#recipe").replaceChildren();
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
  } catch (error) { // Visar felmeddelande om något går fel vid hämtning av recept, samt loggar felet i konsolen.
    messageEl.textContent = "Något gick fel. Försök igen senare.";
    console.error(error);
  }
});

// Funktion som visar receptets namn, bild, info, ingredienser och instruktioner på sidan.
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
    // Receptets info med värden från API:et med feta etiketter.
    let info = document.createElement("div");
    info.className = "recipe-info";
    let servings = document.createElement("p");
    servings.innerHTML = "<strong>Servings:</strong> ";
    servings.append(String(recipe.servings));
    let prepTime = document.createElement("p");
    prepTime.innerHTML = "<strong>Prep time:</strong> ";
    prepTime.append(String(recipe.prepTimeMinutes) + " minutes");
    let cookTime = document.createElement("p");
    cookTime.innerHTML = "<strong>Cooking time:</strong> ";
    cookTime.append(String(recipe.cookTimeMinutes) + " minutes");
    let difficulty = document.createElement("p");
    difficulty.innerHTML = "<strong>Difficulty:</strong> ";
    difficulty.append(recipe.difficulty);

    info.append(servings, prepTime, cookTime, difficulty);

    // Visar receptets ingredienser på sidan.
    let ingredientsHeading = document.createElement("h4");
    ingredientsHeading.textContent = "Ingredients:";
    let ingredientsList = document.createElement("ul");

    // for-loop som skapar en lista med ingredienser.
    for (let i = 0; i < recipe.ingredients.length; i++) {
      let item = document.createElement("li");
      item.textContent = recipe.ingredients[i];
      ingredientsList.appendChild(item);
    }

    // Visar receptets instruktioner på sidan.
    let instructionsHeading = document.createElement("h4");
    instructionsHeading.textContent = "Instructions:";
    let instructionsList = document.createElement("ol");

    // for-loop som skapar en lista med instruktioner.
    for (let i = 0; i < recipe.instructions.length; i++) {
      let item = document.createElement("li");
      item.textContent = recipe.instructions[i];
      instructionsList.appendChild(item);
    }

    //Lägger till alla element i article-elementet och lägger artiklen på sidan så att receptet visas.
    article.appendChild(heading);
    article.appendChild(image);
    article.appendChild(info);
    article.appendChild(ingredientsHeading);
    article.appendChild(ingredientsList);
    article.appendChild(instructionsHeading);
    article.appendChild(instructionsList);
    recipeEl.appendChild(article);
}


