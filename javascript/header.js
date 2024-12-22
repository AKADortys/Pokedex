const headerList = document.querySelectorAll('#header-list>li');
const PokemonsSection = document.getElementById('content-pokemon');
const PokemonSection = document.getElementById('SinglePokemon');
const toggleAside = document.querySelector("#menu-burger");
const btn = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');



function resetDisplay(){
    toggleAside.style.display = 'none';
    PokemonSection.style.display = 'none';
    PokemonsSection.style.display = 'none';
    aside.style.display = 'none';
    btn.style.display = 'none';
    btnPrev.style.display = 'none';
}

headerList.forEach((li) => {
    li.addEventListener('click', ()=> {
        resetDisplay()
       const sectionId = li.getAttribute("data-section");
        const section = document.getElementById(sectionId);
        if(sectionId === "SinglePokemon"){
            toggleAside.style.display = 'none';
            btn.style.display = 'block';
            btnPrev.style.display = 'block';
        }

        else toggleAside.style.display = 'block';
        section.style.display = 'flex';
        aside.style.display = 'flex';
    })
})