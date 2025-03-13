import App from './components/app.js';
import { AppHeader } from './components/layout';
import { PokeList, PokeHome } from './components/pokemons';

function registerComponents() {
  customElements.define('app-root', App);
  customElements.define('app-header', AppHeader);
  customElements.define('poke-home', PokeHome);
  customElements.define('poke-list', PokeList);
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
