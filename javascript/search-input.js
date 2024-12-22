//ajout des écouteurs sur la recherche du input dans l'aside
const inputField = document.getElementById("User-input");

inputField.addEventListener("input", (event) => {
  setTimeout(() => {
    const input = event.target.value.trim();
    if (input !== "") {
      api.filterByName(input);
    } else {
      api.reloadPokemonCard(api.pokemons);
    }
  }, 1000);
});
