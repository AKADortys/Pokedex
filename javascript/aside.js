const aside = document.querySelector('aside');
const menuBurger = document.getElementById('menu-burger');
const buttonCloseAside = document.getElementById('close-aside');

menuBurger.addEventListener('click', () => {
  menuBurger.style.display = 'none';
  setTimeout(() => {
      aside.style.left = "0"
  }, 15);
  
});

buttonCloseAside.addEventListener('click', () => {
    aside.style.left = "-100%";
    setTimeout(() => {
        menuBurger.style.display = "block"
    }, 15);
})

//Méthode pour ajouter les listerners de l'aside sur les éléments générer aprés traitement des données
api.toggleAsideListerners = async () => {

  const filterTypes = document.querySelectorAll(".filter-types");
  const filterGeneration = document.querySelectorAll('.filter-gen');
  
  
  filterGeneration.forEach((element) => {
    element.addEventListener("click", () => {
      resetFilterGenStyle();
      const id = element.getAttribute("data-id");
      spanError.textContent = "";
      element.classList.add("active");
      api.filters.generation = id;
    })});
    
    
    function resetFilterTypeStyle() {
        filterTypes.forEach((element) => {
          element.classList.remove("active");
        });
    }

    function resetFilterGenStyle() {
      filterGeneration.forEach((element) =>{
        element.classList.remove("active");
      })
    }
  
    filterTypes.forEach((element) => {
      element.addEventListener("click", () => {
        resetFilterTypeStyle();
        const id = element.getAttribute("data-id");
        spanError.textContent = "";
        element.classList.add("active");
        api.filters.types = id;
      });
    });
  }