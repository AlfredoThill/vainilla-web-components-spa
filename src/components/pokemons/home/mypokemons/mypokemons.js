import PokemonService from '../../../../services/pokemon.sevice';
import { createSlot } from '../../../../utils/slot';

import MyPokemonCard from './card/card';

class MyPokemons extends HTMLElement {
  static #tagName = 'my-pokemons';
  static get tagName() {
    return MyPokemons.#tagName;
  }
  #gridSlot;

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
    this.#gridSlot?.remove();
    const slot = createSlot('poke-grid', 'section');
    slot.classList.add('card_grid');
    PokemonService.currentUserPokemons.forEach((pokemon) => {
      const card = document.createElement(MyPokemonCard.tagName);
      card.setAttribute('data-pokemon-id', pokemon.id);
      slot.appendChild(card);
    });
    this.#gridSlot = slot;
    this.appendChild(slot);
  }
}

export default MyPokemons;
