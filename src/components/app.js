import { navigationEvents } from '../events/navigation.js';
import { routes } from './routes.js';

class App extends HTMLElement {
  singletonInstance;
  static #activeRoute = '';
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
    App.#activeRoute = this.defineLocationRouting();
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
    App.#activeRoute = { ...routes[path] };
    App.#activeRoute.data = data;
    this.shadowRoot.appendChild(document.createElement(App.#activeRoute.template));
    window.history.pushState({}, App.#activeRoute.title, this.buildPath(App.#activeRoute.path, App.#activeRoute.data));
  }

  buildPath(path, data) {
    if (!data) return path;
    return path.replace(/:([^/]+)/g, (_, param) => data[param]);
  }

  defineLocationRouting() {
    const currentLocation = window.location.pathname;
    if (routes[currentLocation]) return routes[currentLocation];
    const pathSlices = currentLocation.split('/');
    const routeKeys = Object.keys(routes);
    for (const key of routeKeys) {
      const routeSlices = key.split('/');
      if (pathSlices.length !== routeSlices.length) continue;
      const data = {};
      const matched = routeSlices.every((slice, index) => {
        if (slice === pathSlices[index]) return true;
        if (slice.startsWith(':')) {
          data[slice.replace(':', '')] = pathSlices[index];
          return true;
        }
        return false;
      });
      if (matched) {
        return { ...routes[key], data };
      }
    }
    return routes['/home'];
  }
}

export default App;
