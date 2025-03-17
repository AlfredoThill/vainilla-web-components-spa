import { routes } from '../../routes.js';
import SessionService from '../../../services/session.service.js';
import NavigationService from '../../../services/navigation.service.js';
import PokemonService from '../../../services/pokemon.sevice.js';

import { createSlot } from '../../../utils/slot.js';

import MyPokemons from './mypokemons/mypokemons.js';

class PokeHome extends HTMLElement {
  static #tagName = 'poke-home';
  static get tagName() {
    return this.#tagName;
  }
  #myPokemonsSlot;

  loginSubscription;
  logoutSubscription;

  constructor() {
    super();

    const template = document.getElementById('poke-home-template');
    const templateContent = template.content;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateContent.cloneNode(true));

    this.loginSubscription = (_) => this.render();
    this.logoutSubscription = (_) => this.render();
  }

  connectedCallback() {
    this.shadowRoot.querySelector('button').addEventListener('click', this.goToPokemonList.bind(this));
    this.render();
    SessionService.subscribeToLogin(this.loginSubscription);
    SessionService.subscribeToLogout(this.logoutSubscription);
  }

  disconnectedCallback() {
    SessionService.desubscribeFromLogin(this.loginSubscription);
    SessionService.desubscribeFromLogout(this.logoutSubscription);
  }

  goToPokemonList() {
    NavigationService.emitChangePageEvent(routes['/pokemons'].path);
  }

  render() {
    this.#myPokemonsSlot?.remove();
    let slot;
    if (SessionService.loggedIn) {
      slot = createSlot('my-pokemons', 'section');
      PokemonService.getCurrentUserPokemons().then(() => {
        slot.appendChild(document.createElement(MyPokemons.tagName));
      });
    } else {
      slot = createSlot('my-pokemons', 'p');
      slot.textContent = 'Login to see your custom pokemons';
    }
    this.#myPokemonsSlot = slot;
    this.appendChild(slot);
  }
}

export default PokeHome;
