const pokeApi = {}

function convertPokeApiDetailToPokemon (pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.types = types
    pokemon.type = type
    
    const abilities = pokeDetail.abilities.map((typeAbility) => typeAbility.ability.name)
    const [ability] = abilities
    pokemon.abilities = abilities
    pokemon.ability = ability
    pokemon.baseXp = pokeDetail.base_experience
    pokemon.height = (pokeDetail.height)/10
    pokemon.weight = pokeDetail.weight/10
    pokemon.hp = pokeDetail.stats[0].base_stat
    pokemon.attack = pokeDetail.stats[1].base_stat
    pokemon.defense = pokeDetail.stats[2].base_stat

    return pokemon
}

pokeApi.getPokemonsAbout = (pokemon) => {
    const urlDetail = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
    return fetch(urlDetail)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset=0, limit=7) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetails) => pokemonDetails)

}
