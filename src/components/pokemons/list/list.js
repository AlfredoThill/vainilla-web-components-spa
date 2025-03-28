import { getPokemonList } from '../../../api/pokemon.api';

import { routes } from '../../routes';
import NavigationService from '../../../services/navigation.service';

class PokeList extends HTMLElement {
  static #tagName = 'poke-list';
  static get tagName() {
    return this.#tagName;
  }

  #pokemons = [];

  constructor() {
    super();

    const template = document.getElementById('poke-list-template');
    const templateContent = template.content;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelector('button.load-more').addEventListener('click', this.loadMore.bind(this));
    this.shadowRoot.querySelector('button.clear').addEventListener('click', this.clear.bind(this));
    this.shadowRoot.querySelector('ul').addEventListener('click', this.listClickListener.bind(this));
    getPokemonList().then((pokemons) => {
      this.#pokemons = pokemons;
      this.render();
    });
  }

  loadMore() {
    getPokemonList(this.#pokemons.length).then((pokemons) => {
      this.#pokemons = [...this.#pokemons, ...pokemons];
      this.render(pokemons);
    });
  }

  clear() {
    const ul = this.shadowRoot.querySelector('ul');
    this.#pokemons = [];
    ul.innerHTML = '';
  }

  listClickListener(event) {
    const entry = event.composedPath()[0];
    if (entry.tagName === 'LI' && entry.hasAttribute('poke-url')) {
      const id = entry.getAttribute('poke-url').split('/').filter(Boolean).pop();
      NavigationService.emitChangePageEvent(routes['/pokemon/:id'].path, { id });
    }
  }

  render(pokemons = this.#pokemons) {
    const ul = this.shadowRoot.querySelector('ul');
    const listItems = pokemons.map((pokemon) => {
      const li = document.createElement('li');
      li.setAttribute('poke-id', pokemon.id);
      li.setAttribute('poke-url', pokemon.url);
      li.textContent = pokemon.name;
      return li;
    });
    ul.append(...listItems);
  }
}

export default PokeList;
