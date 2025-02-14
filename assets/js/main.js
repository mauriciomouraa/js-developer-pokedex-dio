const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
var backArrow;

let offset = 0;
const limit = 10;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
                    <button id="button${pokemon.number}" class="pokemon ${pokemon.type}" aria-label="pokemon ${pokemon.name}">
                                    <span class="number">#${pokemon.number}</span>
                                    <span class="name">${pokemon.name}</span>
                                    <div class="detail">
                                        <ol class="types">
                                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                        </ol>
                                        <img class="imagePokemon" src="${pokemon.photo}" alt="${pokemon.name}"></img>
                                        <div class="backgroundPokemon">
                                            <img src="assets/images/back.svg" alt=""></img>
                                        
                                        </div>
                                        
                                    </div>
                </button>
                `).join('')
        pokemonList.innerHTML += newHtml
   })
      
}


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(offset, limit)
})

const buttonPokemonId = document.getElementById('pokemonList');
var modal = document.getElementById('modalPokemon');


function loadPokemonAbout(pokemon) {
    pokeApi.getPokemonsAbout(pokemon).then((pokemon = []) => {
        const htmlInfo = `
                    <div class="paginaPokemon ${pokemon.type}">
                                <span class="close">&#8592;</span>
                                    <h2 class="namePagina">${pokemon.name}</h2>
                                    
                                    <div class="detailPagina">
                                        <span class="numberPagina">#${pokemon.number}</span>
                                        <ol class="typesPagina">
                                            ${pokemon.types.map((type) => `<li class="typePagina ${type}">${type}</li>`).join('')}
                                        </ol>
                                    </div>
                                    <div class="backgroundPokemonPagina">
                                        <img src="assets/images/back.svg" alt="">
                                    </div>
                                </div>

                            <div class="imagePokemonPagina">
                                    <img  src="${pokemon.photo}" alt="${pokemon.name}">
                            </div>
                        
                            <div class="paginaPokemonBottom">
                                        <span class="about">About</span>
                                        <div class="aboutDetails">
                                            <ol class="typePaginaBottomAbout">
                                                <li>Base XP</li>
                                                <li>Height</li>
                                                <li>Weight</li>
                                                <li>Abilities</li>
                                            </ol>
                                            <ol class="typePaginaBottomAboutResponse">
                                                <li>${pokemon.baseXp}</li>
                                                <li>${pokemon.height} m</li>
                                                <li>${pokemon.weight} kg</li>
                                                <li class="abilityResponse"> ${pokemon.abilities.map((ability) => ability).join(", ")} </li>
                                            </ol>

                                        </div>
                                        <span class="about">Base Stats</span>
                                        <div class="aboutBaseStats">
                                            <ol class="typePaginaBottomBaseStats">
                                                <li>HP</li>
                                                <li>Attack</li>
                                                <li>Defense</li>
                                            </ol>
                                            <ol class="typePaginaBottomBaseStatsResponse">
                                                <li>${pokemon.hp}</li>
                                                <li>${pokemon.attack}</li>
                                                <li>${pokemon.defense}</li>
                                            </ol>
                                            <ol class="typePaginaBottomBaseStatsBar">
                                                <li class="progressBarHp"></li>
                                                <li class="progressBarAt"></li>
                                                <li class="progressBarDf"></li>
                                            </ol>
                                        </div>
                            </div> 
    `
        
        modal.style.display = "block";
        modal.innerHTML = htmlInfo;
        document.querySelector(".progressBarHp").style.setProperty('--dataProgressHp', `${pokemon.hp}%`); 
        document.querySelector(".progressBarAt").style.setProperty('--dataProgressAt', `${pokemon.attack}%`); 
        document.querySelector(".progressBarDf").style.setProperty('--dataProgressDf', `${pokemon.defense}%`); 
        backArrow = document.querySelector('.close'); 
        
    })
}

buttonPokemonId.addEventListener('click', (event) => {
    const button = event.target.closest('BUTTON'); // Tenta encontrar o botão mais próximo

    if (!button) return; // Se não encontrou um botão, sai da função

    const pokemon = button.querySelector('.number').textContent.replace('#', '');
    loadPokemonAbout(pokemon);  
});

modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("close")) {
        modal.style.display = "none";
    }
});

window.addEventListener("click", (event) => {
    var modal = document.getElementById("modalPokemon");

    if (event.target === modal) {
        modal.style.display = "none";
    }
});





