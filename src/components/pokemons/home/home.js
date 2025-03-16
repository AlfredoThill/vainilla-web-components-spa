import { buildChangePageEvent } from '../../../events/navigation.js';
import { routes } from '../../routes.js';

class PokeHome extends HTMLElement {
  static #tagName = 'poke-home';
  static get tagName() {
    return this.#tagName;
  }

  constructor() {
    super();

    const template = document.getElementById('poke-home-template');
    const templateContent = template.content;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelector('button').addEventListener('click', this.goToPokemonList.bind(this));
  }

  goToPokemonList() {
    document.dispatchEvent(buildChangePageEvent(routes['/pokemons'].path));
  }
}

export default PokeHome;
