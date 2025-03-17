import { buildChangePageEvent, navigationEvents } from './../events/navigation.js';
import { routes } from './../components/routes.js';

class NavigationService {
  #activeRoute;
  #changePageSideEffects = [];

  constructor() {
    document.addEventListener(navigationEvents.changePage, (event) => {
      for (let sideEffect of this.#changePageSideEffects) {
        try {
          sideEffect(event);
        } catch (error) {
          console.error(error);
        }
      }
    });

    window.addEventListener('popstate', (event) => {
      this.#activeRoute = this.defineLocationRouting();
      document.dispatchEvent(buildChangePageEvent(this.#activeRoute.path, this.#activeRoute.data));
    });
  }

  subscribeToChangePage(sideEffect) {
    this.#changePageSideEffects.push(sideEffect);
  }
  desubscribeFromChangePage(sideEffect) {
    this.#changePageSideEffects = this.#changePageSideEffects.filter((se) => se !== sideEffect);
  }

  get activeRoute() {
    return this.#activeRoute;
  }

  emitChangePageEvent(path, data) {
    if (!routes[path]) {
      console.warn(`Route ${path} not found`);
      return;
    }
    if (this.#activeRoute?.path === path) return;
    this.#activeRoute = { ...routes[path], data };
    document.dispatchEvent(buildChangePageEvent(path, data));
    window.history.pushState(
      {},
      this.#activeRoute.title,
      this.buildPath(this.#activeRoute.path, this.#activeRoute.data)
    );
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

const navigationService = new NavigationService();

export default navigationService;
