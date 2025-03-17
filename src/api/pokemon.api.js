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

(function () {
  const pokemons = [
    {
      id: 'GK74I',
      name: 'Bulbasaur',
      description: 'This is my custom bulbasaur',
      stats: { hp: 45, attack: 49, defense: 49, speed: 45, specialAttack: 22, specialDefence: 54 },
    },
    {
      id: 'GK74K',
      name: 'Charmander',
      description: 'This is my custom charmander',
      stats: { hp: 39, attack: 52, defense: 43, speed: 65, specialAttack: 60, specialDefence: 50 },
    },
  ];
  localStorage.setItem('alfredothill@gmail.com', JSON.stringify(pokemons));
})();

export { getPokemonList, getPokemonDetails, getPokemonsByUser, savePokemon };
