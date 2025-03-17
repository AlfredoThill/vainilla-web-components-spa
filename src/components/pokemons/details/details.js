import { getPokemonDetails } from '../../../api/pokemon.api';

import { routes } from '../../routes';
import NavigationService from '../../../services/navigation.service';

class PokeDetails extends HTMLElement {
  static #tagName = 'poke-detail';
  static get tagName() {
    return this.#tagName;
  }
  #pokeId;

  constructor() {
    super();
    const template = document.getElementById('poke-details-template');
    const templateContent = template.content;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  connectedCallback() {
    if (NavigationService.activeRoute?.data?.id) {
      this.#pokeId = NavigationService.activeRoute.data.id;
      getPokemonDetails(NavigationService.activeRoute.data.id).then((pokemon) => {
        this.populateHeader(pokemon);
        this.populateStats(pokemon);
        this.shadowRoot.getElementById('edit').addEventListener('click', this.editClickListener.bind(this));
      });
    }
  }

  populateHeader(pokemon) {
    this.shadowRoot.getElementById('name').textContent = `Name: ${pokemon.name}`;
    this.shadowRoot.getElementById('height').textContent = `Height: ${pokemon.height}`;
    this.shadowRoot.getElementById('weight').textContent = `Weight: ${pokemon.weight}`;
    this.shadowRoot.getElementById('image-front').src = pokemon.sprites.front_default;
  }

  populateStats({ stats }) {
    const statsList = this.shadowRoot.getElementById('base-stats');
    stats.forEach((stat) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
      statsList.appendChild(listItem);
    });
  }

  editClickListener() {
    NavigationService.emitChangePageEvent(routes['/pokemon/:id/edit'].path, { id: this.#pokeId });
  }
}

export default PokeDetails;
