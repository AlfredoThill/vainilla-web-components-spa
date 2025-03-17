import PokemonService from '../../../../services/pokemon.sevice';

import MyPokemonCard from './card/card';

class MyPokemons extends HTMLElement {
  static #tagName = 'my-pokemons';
  static get tagName() {
    return MyPokemons.#tagName;
  }

  constructor() {
    super();
    const template = document.getElementById('my-pokemons-template');
    const templateContent = template.content;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const grid = this.shadowRoot.querySelector('section');
    PokemonService.currentUserPokemons.forEach((pokemon) => {
      const card = document.createElement(MyPokemonCard.tagName);
      card.setAttribute('data-pokemon-id', pokemon.id);
      grid.appendChild(card);
    });
  }
}

export default MyPokemons;
