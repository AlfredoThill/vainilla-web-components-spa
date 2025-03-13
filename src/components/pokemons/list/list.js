import { getPokemonList } from '../../../api/pokemon.api';

class PokeList extends HTMLElement {
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

  render(pokemons = this.#pokemons) {
    const ul = this.shadowRoot.querySelector('ul');
    const listItems = pokemons.map((pokemon) => {
      const li = document.createElement('li');
      li.textContent = pokemon.name;
      return li;
    });
    ul.append(...listItems);
  }
}

export default PokeList;
