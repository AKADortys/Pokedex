api.displayChart = ()=>{
    const canvas = document.querySelector(".chart");
    const resistance = document.querySelector(".SP-resistance");

    const id = canvas.getAttribute("data-id");
    const pokemon = api.pokemons.find((pokemon)=> pokemon.pokedex_id === parseInt(id));
//Chart pour les statistiques du pokemon
    const data = {
        labels: [
          'HP',
          'Attaque',
          'Défense',
          'Spe_attaque',
          'spe_defense',
          'Vitesse'
        ],
        datasets: [{
          label: 'Statistique',
          data: [pokemon.stats.hp, pokemon.stats.atk,pokemon.stats.def,pokemon.stats.spe_atk, pokemon.stats.spe_def, pokemon.stats.vit],
          fill: true,
          backgroundColor: 'rgba(32, 251, 58, 0.2)',
          borderColor: 'rgb(83, 248, 83)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]}

        const config = {
            type: 'radar',
            data: data,
            options: {
                scales: {
                    r: {
                        angleLines: {
                            display: false
                        },
                        min: 0,
                        max: 255
                    }
                },
              elements: {
                line: {
                  borderWidth: 3,
                  backgroundColor: "white"
                }
              }
            },
          };

          new Chart(canvas, config)

////////////////////////////////////////////////////////////////////////////////////////////////////////

//Chart pour les resistances du pokemon
const labels = [];
const multipliers = [];
pokemon.resistances.forEach(element => {
  labels.push(element.name);
  multipliers.push(element.multiplier);
});

const dataRes = {
  labels: labels,
  datasets: [{
    label: 'Resistances & vulnérabilités',
    data: multipliers,
    backgroundColor: [
      'rgb(153, 102, 255)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 0.2)'
    ],
    borderWidth: 1
  }]
};


const configRes = {
  type: 'bar',
  data: dataRes,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        stacked: true
      }
    }
  },
};

new Chart(resistance, configRes)


}

