//Méthode pour initialiser les listerners de la page html
api.toggleListerners = () => {
    const buttons = document.querySelectorAll(".toggle-shiny");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        const regularImg = document.getElementById(`poke-img-${id}`);
        const shinyImg = document.getElementById(`poke-img-shiny-${id}`);
  
        // Basculer entre les images
        if (regularImg.style.display == "none") {
          regularImg.style.display = "block";
          shinyImg.style.display = "none";
        } else {
          regularImg.style.display = "none";
          shinyImg.style.display = "block";
        }
      });
    });


        //Ajout des écouteurs sur les bouttons du conteneur singlepokemon
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');

    //pokémon suivant
    btnNext.addEventListener('click', () => {
        if(api.pokemons.length === api.index) {
            console.warn('Plus de Pokémon disponible !!!!');
            return;
        }
        api.index++;
        api.reloadSinglePokemon(api.goToPokemon());
    });
    
    //pokémon précédent
    btnPrev.addEventListener('click', () => {
        if(api.index === 1) {
            console.warn('Plus de Pokémon disponible !!!!');
            return;
        }
      api.index--;
      api.reloadSinglePokemon(api.goToPokemon())
    });
  };