import App from './components/app.js';
import { AppHeader } from './components/layout';
import { PokeList, PokeHome, PokeDetail, PokeEdit } from './components/pokemons';

import AdoptGlobalStyles from './components/common/adopt.global.style.js';

function registerComponents() {
  customElements.define('app-root', App);
  customElements.define('app-header', AppHeader);
  customElements.define('poke-home', PokeHome);
  customElements.define('poke-list', PokeList);
  customElements.define('poke-detail', PokeDetail);
  customElements.define('poke-edit', PokeEdit);

  customElements.define('global-styles', AdoptGlobalStyles);
}

function bootstrap() {
  customElements.whenDefined('app-root').then(() => {
    document.getElementById('app').innerHTML = `
      <app-root></app-root>
    `;
  });
}

registerComponents();
bootstrap();
