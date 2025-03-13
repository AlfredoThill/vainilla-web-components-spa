import { navigationEvents } from '../events/navigation.js';

export const routes = {
  '/home': {
    template: 'poke-home',
    path: '/home',
    title: 'Home',
  },
  '/pokemons': {
    template: 'poke-list',
    path: '/pokemons',
    title: 'Pokemons',
  },
  '/about': {
    template: 'about',
    path: '/about',
    title: 'About',
  },
};

class App extends HTMLElement {
  singletonInstance;
  static #activeRoute = '';
  #routes = routes;
  changePageListener;

  static get activeRoute() {
    return this.#activeRoute;
  }

  constructor() {
    super();
    if (this.singletonInstance) {
      return this.singletonInstance;
    }
    this.singletonInstance = this;

    const template = document.getElementById('app-template');
    const templateContent = template.content;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateContent.cloneNode(true));

    this.changePageListener = (event) => {
      this.handleChangePage(event.detail.page);
    };
  }

  connectedCallback() {
    App.#activeRoute = routes[window.location.pathname] || routes['/home'];
    this.handleChangePage(App.#activeRoute.path);
    document.addEventListener(navigationEvents.changePage, this.changePageListener);
  }

  disconnectedCallback() {
    document.removeEventListener(navigationEvents.changePage, this.changePageListener);
  }

  handleChangePage(path) {
    if (!routes[path]) return;
    const activeTemplate = App.#activeRoute.template;
    this.shadowRoot.querySelector(activeTemplate)?.remove();
    App.#activeRoute = routes[path];
    this.shadowRoot.appendChild(document.createElement(App.#activeRoute.template));
    // set browser url to active route
    window.history.pushState({}, App.#activeRoute.title, App.#activeRoute.path);
  }
}

export default App;
