import { getPokemonsByUser, savePokemon } from '../api/pokemon.api';
import SessionService from './session.service';

class PokemonService {
  #isFetched = false;
  #currentUserPokemons = [];
  #currentUserPokemonsMap = {};

  get currentUserPokemons() {
    return this.#currentUserPokemons;
  }

  get currentUserPokemonsMap() {
    return this.#currentUserPokemonsMap;
  }

  async getCurrentUserPokemons(force = false) {
    if (!this.#isFetched || force) {
      const email = SessionService.getSessionData().email;
      if (!email) return [];
      this.#currentUserPokemons = await getPokemonsByUser(email);
      this.#currentUserPokemonsMap = this.#currentUserPokemons.reduce((acc, pokemon) => {
        acc[pokemon.id] = pokemon;
        return acc;
      }, {});
      this.#isFetched = true;
    }
    return this.#currentUserPokemons;
  }
}

const pokemonService = new PokemonService();

export default pokemonService;
