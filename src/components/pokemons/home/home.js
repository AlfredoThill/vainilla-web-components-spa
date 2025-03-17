import { routes } from '../../routes.js';
import SessionService from '../../../services/session.service.js';
import NavigationService from '../../../services/navigation.service.js';

import MyPokemons from './mypokemons/mypokemons.js';

class PokeHome extends HTMLElement {
  static #tagName = 'poke-home';
  static get tagName() {
    return this.#tagName;
  }

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
    const section = this.shadowRoot.getElementById('my-pokemons');
    section.childNodes?.forEach((child) => child.remove());
    if (SessionService.loggedIn) {
      section.appendChild(document.createElement(MyPokemons.tagName));
    } else {
      const p = document.createElement('p');
      p.textContent = 'Login to see your custom pokemons';
      section.appendChild(p);
    }
  }
}

export default PokeHome;
