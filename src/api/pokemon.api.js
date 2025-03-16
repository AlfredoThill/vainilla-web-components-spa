function getPokemonList(offset = 0, limit = 20) {
  return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    .then((response) => response.json())
    .then((data) => data.results);
}

function getPokemonDetails(id) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => response.json());
}

function getPokemonsByUser(email) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pokemons = JSON.parse(localStorage.getItem(email)) || [];
      resolve(pokemons);
    }, 500);
  });
}

function savePokemon(email, pokemon) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pokemons = JSON.parse(localStorage.getItem(email)) || [];
      pokemons.push(pokemon);
      localStorage.setItem(email, JSON.stringify(pokemons));
      resolve(pokemon);
    }, 500);
  });
}

export { getPokemonList, getPokemonDetails, getPokemonsByUser, savePokemon };
