    //Ajout des écouteurs sur les bouttons
const btn = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');

    //pokémon suivant
    btn.addEventListener('click', () => {
        if(api.pokemons.length === api.index) {
            console.warn('Plus de Pokémon disponible !!!!');
            return;
        }
        api.index++;
        api.displayPokemon(api.goToPokemon());
    });
    
    //pokémon précédent
    btnPrev.addEventListener('click', () => {
        if(api.index === 1) {
            console.warn('Plus de Pokémon disponible !!!!');
            return;
        }
      api.index--;
      api.displayPokemon(api.goToPokemon()); 
    });
