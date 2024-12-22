
const spanError = document.getElementById("search-error");

const api = {
  urlApi: "https://tyradex.vercel.app/api/v1/",
  index: 1,
  pokemons: [],
  types: [],
  generation: [],
  filters: {
    types: null,
    generation: null
  }
};
//Méthode pour initialiser les composants de la page html
api.initApp = async () => {
  await api.getAllPokemons();
  api.getAllTypes(api.pokemons);
  api.getAllGenerations(api.pokemons);
  await api.displayPokemon(api.goToPokemon());
  await api.displayPokemons(api.pokemons);
  await api.displayTypesFilter(api.types);
  await api.displayGenerationFilter(api.generation);
  api.toggleListerners();
  api.toggleAsideListerners();
  api.displayChart();
  return;
};

//Méthode pour recharger les cartes avec leurs listeners
api.reloadPokemonCard = async (data) => {
  await api.displayPokemons(data);
  api.toggleListerners();
}

//méthode pour recharger le conteneur singlePokemon
api.reloadSinglePokemon = async (data) => {
  await api.displayPokemon(data);
  api.displayChart();
  return;
};

//méthode pour récupérer les pokémons via https://tyradex.vercel.app/api/v1/pokemon
api.getAllPokemons = async () => {
  try {
    const response = await fetch(`${api.urlApi}pokemon`);
    const data = await response.json();
    api.pokemons = data;
    return data;
  } catch (err) {
    console.error("Error fetching Pokémon data:", err);
  }
};

//Méthode pour récupérer tout les types dans un tableau
api.getAllTypes = (data) => {
  const uniqueTypes = [];
  data.forEach((pokemon) => {
    if (pokemon.pokedex_id !== 0) {
      pokemon.types.forEach((type) => {
        // Vérifie si le type existe déjà dans le tableau
        const exists = uniqueTypes.find(
          (uniqueType) => uniqueType.name === type.name
        );
        if (!exists) {
          uniqueTypes.push(type);
        }
      });
    }
  });
  api.types = uniqueTypes;
  return;
};

//Méthode pour récupérer toutes les génération de pokémon
api.getAllGenerations = (data) => {
  const uniqueGeneration = [];
  data.forEach((pokemon) => {
    if (pokemon.pokedex_id !== 0) {
        // Vérifie si le type existe déjà dans le tableau
        const exists = uniqueGeneration.find( (p) => p === pokemon.generation );
        if (!exists) {
          uniqueGeneration.push(pokemon.generation);
        }
      ;
    }
  });
  api.generation = uniqueGeneration;
  return;
}

//méthode pour naviguer vers un pokémon précis via son index
api.goToPokemon = () => {
  return api.pokemons.filter((element) => element.pokedex_id === api.index)
};

//Méthode pour filtrer avec le pokedex_id
api.filterById = (id) =>{
  return api.pokemons.filter((element) => element.pokedex_id === id)
}

//méthode pour récupérer le pokémons via du texte ( renvoie le premier pokémon trouvé)
api.filterByName = (input) => {  
  spanError.textContent = "";
  const poke = api.pokemons.find(
    (p) => p.name.fr.toLowerCase() === input.toLowerCase()
  );

  if (poke) {
    api.displayPokemons(poke);
    api.toggleListerners();
  } else {
    const pokemon = api.pokemons.filter((u) =>
      u.name.fr.toLowerCase().includes(input.toLowerCase())
    );
    if (!pokemon.length > 0) {
      spanError.textContent = "Aucun Pokémon trouvé avec ce nom !";
      setTimeout(() => {
        spanError.textContent = "";
      }, 3000);
    } else {
      api.reloadPokemonCard(pokemon);
    }
  }
  return
};

//Méthode pour filtrer le pokemon par type
api.filterByType = (data,id) => {
  return data.filter(
    (pokemon) =>
      pokemon.pokedex_id !== 0 &&
      pokemon.types.some((type) => type.name === id)
  );
};

//Méthode pour filtrer le pokemon par génération
api.filterByGeneration = (data,id) => {
return data.filter(
(pokemon) => pokemon.pokedex_id !== 0 && pokemon.generation === parseInt(id)
);
};

//Méthode pour filtrer les pokémons par type et génération
api.filterGroup = () =>{
  let filterPokemons = api.pokemons;
  console.log("Pokémons avant filtrage :", filterPokemons);
  if (api.filters.types !== null) {
    console.log("Filtrage par type :", api.filters.types);
    filterPokemons = api.filterByType(filterPokemons, api.filters.types);
    console.log("Pokémons après filtrage par type :", filterPokemons);
  }
  if (api.filters.generation !== null) {
    console.log("Filtrage par génération :", api.filters.generation);
    filterPokemons = api.filterByGeneration(filterPokemons, api.filters.generation);
    console.log("Pokémons après filtrage par génération :", filterPokemons);
  }
  api.reloadPokemonCard(filterPokemons)
}

api.filterReset = () =>{
  api.filters = { types: null, generation: null };
}

//Méthode pour afficher une seule fiche de pokémons
api.displayPokemon = (data) => {
  if (data == null) return;
  let pokemontab = Array.isArray(data) ? data : [data];
  let element = pokemontab[0];
  api.index = element.pokedex_id
  const container = document.getElementById("SinglePokemon");
  container.innerHTML = ""; // Réinitialise le contenu avant d'ajouter de nouveaux éléments
  
  if (element.pokedex_id !== 0) {
    let response = `
          <div class="SP-identification">
              <div class="SP-Image">
                  <img src="${element.sprites.regular}" id="poke-img-single" alt="Image normale" title="${element.name.fr}">
                  <img src="${element.sprites.shiny}" id="poke-img-shiny-single" alt="Image shiny" title="${element.name.fr}"></div><div class="SP-type">`
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Affichage des images des types du pokémon
              if (element.types !== null) {
                element.types.forEach((elementType) => {
                  response += `<img src="${elementType.image}" title="${elementType.name}" alt="${elementType.name}" />`;
                });
              }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    response += "</div>"
    //Affichage des stats du pokémon avec un diagrame Chart.js voir ---> ./chartPokemon.js
    if(element.stats !== null){
      response += 
      `
      <div class="SP-stats">
        <div class="chart-radar">
        <canvas class="chart" data-id="${element.pokedex_id}"></canvas>
        </div>
        <div class="chart-bar">
        <canvas class="SP-resistance"></canvas>
        </div>
      </div>`;
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
    //Affichage du nom et des infos du pokémon
    response += `</div>
          <div class="SP-body">
              <h2 class="poke-name">${element.name.fr} - ${element.name.en} - ${element.name.jp}</h2>
              <div class="SP-info">
                  <p>Taille : <span>${element.height}</span></p>
                  <p>Poids : <span>${element.weight}</span></p>
                  <p>Chances de capture : <span>${element.catch_rate}</span>%</p>
                  <p>XP lvl.100 : <span>${element.level_100}</span></p>
              </div>`;
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Affichage des talents du pokémon
    response += `<div class="talents"> <h3>Talents du pokémon</h3>`;
    element.talents.forEach((item) => {
      response += `<p>${item.name} ${item.tc ? "Talent caché":"Talent de base"}</p>`;
    })
    response += "</div>";
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Affichage des évolutions précédente et suivante
    
    if(element.evolution !== null){
      response +=`<div class="evolution">`;
      
      if(element.evolution.pre !== null){
        response += '<h3>Evolution précedente</h3><ul class="SP-evolution-pre">';
        element.evolution.pre.forEach((item) => {
          const pokemon = api.filterById(item.pokedex_id)
          response += `<li><img src="${pokemon[0].sprites.regular}" title="${pokemon[0].name.fr}">
                      <button onclick="api.reloadSinglePokemon(api.filterById(${pokemon[0].pokedex_id}))">Voir fiche</button>
                      Condition : ${item.condition}</li>`;
        })
      }
      
      if(element.evolution.next !== null){
        response += '</ul><h3>Evolution suivante</h3><ul class="SP-evolution-next">'
        element.evolution.next.forEach((item) => {
          const pokemon = api.filterById(item.pokedex_id)
          response += `<li><img src="${pokemon[0].sprites.regular}" title="${pokemon[0].name.fr}">
                      <button onclick="api.reloadSinglePokemon(api.filterById(${pokemon[0].pokedex_id}))">Voir fiche</button>
                      Condition : ${item.condition}</li>`;
        })
      }
      response += "</ul></div>";
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const card = document.createElement("div");
    card.innerHTML = response;
    card.setAttribute("class", "SingleCard");
    container.appendChild(card);
  }
}

//méthode pour afficher les informations du pokémon dans les éléments html
api.displayPokemons = (data) => {
  if (data == null) return;
  let _data = Array.isArray(data) ? data : [data];
  const container = document.getElementById("content-pokemon");
  container.innerHTML = ""; // Réinitialise le contenu avant d'ajouter de nouveaux éléments

  _data.forEach((element) => {
    if (element.pokedex_id !== 0) {
      let response = `
            <div class="identification">
                <h2 class="poke-name">${element.name.fr} - ${element.name.en} - ${element.name.jp}</h2>
                <div>
                    <img src="${element.sprites.regular}" class="poke-img" id="poke-img-${element.pokedex_id}" alt="Image normale" title="${element.name.fr}">
                    <img src="${element.sprites.shiny}" class="poke-img-shiny" id="poke-img-shiny-${element.pokedex_id}" alt="Image shiny" title="${element.name.fr}">
                </div>
                <button class="toggle-shiny" data-id="${element.pokedex_id}" title="Afficher/Masquer le modèle Shiny"></button>
            </div>
            <div class="card-body">
                <div id="poke-info">
                    <p>Taille : ${element.height}</p>
                    <p>Poids : ${element.weight}</p>
                </div>
                <div id="poke-type">`;

      if (element.types !== null) {
        element.types.forEach((elementType) => {
          response += `<img src="${elementType.image}" title="${elementType.name}" alt="${elementType.name}" />`;
        });
      }
      if (element.stats !== null) {
        response += `
                </div>
                <h3>Statistique du Pokémon</h3>
                <ul class="poke-stat">
                <li title="Point de vie"><img src="images/heart.png" alt="Coeur"> ${element.stats.hp}</li>
                <li title="Point d'attaque"><img src="images/damage.png" alt="Epées"> ${element.stats.atk}</li>
                <li title="Defense"><img src="images/shield.png" alt="Bouclier"> ${element.stats.def}</li>
                <li title="Vitesse"><img src="images/speed.png" alt="Vitesse"> ${element.stats.vit}</li>
                </ul>`;
      }
      const card = document.createElement("div");
      card.innerHTML = response;
      card.setAttribute("class", "card");
      container.appendChild(card);
    }
  });
  const span = document.getElementById("totalPokemon");
  span.innerText = `${_data.length} résultats`;
  return
};

//méthode pour afficher les types dans une liste
api.displayTypesFilter = (data) => {
  const ul = document.getElementById("filter-types");
  let innerHTML = "";
  data.forEach((type) => {
    innerHTML += `<li><img src="${type.image}" class="filter-types" data-id="${type.name}" title="${type.name}"></label></li>`;
  });
  ul.innerHTML = innerHTML;
  return;
};

//Méthode pour afficher les generation dans les filtres
api.displayGenerationFilter = (data) => {
  const ul = document.getElementById("filter-generation")
  let innerHTML = "";
  data.forEach((generation) => {
    innerHTML += `<li class="filter-gen" data-id="${generation}">Génération n°${generation}</li>`;
  });
  ul.innerHTML = innerHTML;
  return
}


api.initApp();
