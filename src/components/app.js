import { navigationEvents } from '../events/navigation.js';
import { routes } from './routes.js';

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
      this.handleChangePage(event.detail);
    };
  }

  connectedCallback() {
    App.#activeRoute = routes[window.location.pathname] || routes['/home'];
    this.handleChangePage(App.#activeRoute);
    document.addEventListener(navigationEvents.changePage, this.changePageListener);
  }

  disconnectedCallback() {
    document.removeEventListener(navigationEvents.changePage, this.changePageListener);
  }

  handleChangePage({ path, data }) {
    if (!routes[path]) return;
    const activeTemplate = App.#activeRoute.template;
    this.shadowRoot.querySelector(activeTemplate)?.remove();
    App.#activeRoute = routes[path];
    App.#activeRoute.data = data;
    this.shadowRoot.appendChild(document.createElement(App.#activeRoute.template));
    window.history.pushState({}, App.#activeRoute.title, this.buildPath(App.#activeRoute.path, App.#activeRoute.data));
  }

  buildPath(path, data) {
    if (!data) return path;
    return path.replace(/:([^/]+)/g, (_, param) => data[param]);
  }
}

export default App;
