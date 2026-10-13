"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Mattias Åfeldt
 */

const searchFormEl = document.querySelector("#searchform");
const searchInputEl = document.querySelector("#search");
const errorEl = document.querySelector("#error");

// Event listener för formuläret
searchFormEl.addEventListener("submit", (event) => {
  // Hanterar sökning i formuläret utan att sidan laddas om.  
  event.preventDefault();
  // Visar felmeddelande om formuläret är tomt, annars loggas sökordet i konsolen.
  const searchTerm = searchInputEl.value.trim();
  errorEl.textContent = "";
  if (searchTerm === "") {
    errorEl.textContent = "Skriv in ett sökord!";
    return;
  }
  console.log("Sökord:", searchTerm);
});