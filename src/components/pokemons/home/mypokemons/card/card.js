import PokemonService from '../../../../../services/pokemon.sevice';

class MyPokemonCard extends HTMLElement {
  static #tagName = 'my-pokemon-card';
  static get tagName() {
    return MyPokemonCard.#tagName;
  }

  constructor() {
    super();
    const template = document.getElementById('my-pokemon-card-template');
    const templateContent = template.content;
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  connectedCallback() {
    if (this.dataset.pokemonId && PokemonService.currentUserPokemonsMap[this.dataset.pokemonId]) {
      this.renderSlots(PokemonService.currentUserPokemonsMap[this.dataset.pokemonId]);
    }
  }

  renderSlots({ name, description, stats: { hp, attack, defense, speed, specialAttack, specialDefence } }) {
    this.appendChild(this.createSpanSlot('name', name));
    this.appendChild(this.createSpanSlot('description', description));
    this.appendChild(this.createSpanSlot('hp', hp));
    this.appendChild(this.createSpanSlot('attack', attack));
    this.appendChild(this.createSpanSlot('defense', defense));
    this.appendChild(this.createSpanSlot('speed', speed));
    this.appendChild(this.createSpanSlot('special-attack', specialAttack));
    this.appendChild(this.createSpanSlot('special-defence', specialDefence));
  }

  createSpanSlot(name, value) {
    const span = document.createElement('span');
    span.setAttribute('slot', name);
    span.textContent = value;
    return span;
  }
}

export default MyPokemonCard;
