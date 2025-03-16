import { getPokemonsByUser, savePokemon } from '../api/pokemon.api';
import SessionService from './session.service';

class PokemonService {
  #currentUserPokemons = [];

  get currentUserPokemons() {
    return this.#currentUserPokemons;
  }

  async fetchCurrentUserPokemons() {
    const email = SessionService.currentUserEmail;
    if (!email) return [];
    this.#currentUserPokemons = await getPokemonsByUser(email);
    return this.#currentUserPokemons;
  }
}

const pokemonService = new PokemonService();

export default pokemonService;
