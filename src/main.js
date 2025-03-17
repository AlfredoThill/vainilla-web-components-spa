import App from './components/app.js';
import { AppHeader } from './components/layout';
import AppLogin from './components/login/login.js';
import { PokeList, PokeHome, MyPokemons, MyPokemonCard, PokeDetail, PokeEdit } from './components/pokemons';

import AdoptGlobalStyles from './components/common/adopt.global.style.js';

function registerComponents() {
  customElements.define('app-root', App);
  customElements.define(AdoptGlobalStyles.tagName, AdoptGlobalStyles);

  customElements.define(AppHeader.tagName, AppHeader);
  customElements.define(AppLogin.tagName, AppLogin);

  customElements.define(PokeHome.tagName, PokeHome);
  customElements.define(MyPokemons.tagName, MyPokemons);
  customElements.define(MyPokemonCard.tagName, MyPokemonCard);
  customElements.define(PokeList.tagName, PokeList);
  customElements.define(PokeDetail.tagName, PokeDetail);
  customElements.define(PokeEdit.tagName, PokeEdit);
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
