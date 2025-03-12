function getPokemonList(offset = 0, limit = 20) {
  return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    .then((response) => response.json())
    .then((data) => data.results);
}

export { getPokemonList };
