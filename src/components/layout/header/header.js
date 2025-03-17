import { routes } from './../../routes.js';
import SessionService from '../../../services/session.service.js';
import NavigationService from '../../../services/navigation.service.js';

import AppLogin from '../../login/login.js';

class AppHeader extends HTMLElement {
  static #tagName = 'app-header';
  static get tagName() {
    return this.#tagName;
  }

  #idsMap = {
    home: 'home-anchor',
    pokemons: 'pokemons-anchor',
    about: 'about-anchor',
  };

  #routeToAnchorMap = {
    [routes['/home'].path]: this.#idsMap.home,
    [routes['/pokemons'].path]: this.#idsMap.pokemons,
    [routes['/about'].path]: this.#idsMap.about,
  };

  loginSubscription;
  logoutSubscription;
  changePageSubscription;

  constructor() {
    super();

    const template = document.getElementById('header-template');
    const templateContent = template.content;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateContent.cloneNode(true));

    this.loginSubscription = (_) => this.render();
    this.logoutSubscription = (_) => this.render();
    this.changePageSubscription = (_) => this.setActiveLink();
  }

  connectedCallback() {
    this.shadowRoot.getElementById(this.#idsMap.home).addEventListener('click', (event) => this.handleHomeClick(event));
    this.shadowRoot
      .getElementById(this.#idsMap.pokemons)
      .addEventListener('click', (event) => this.handlePokemonListClick(event));

    this.render();

    SessionService.subscribeToLogin(this.loginSubscription);
    SessionService.subscribeToLogout(this.logoutSubscription);
    NavigationService.subscribeToChangePage(this.changePageSubscription);
  }

  disconnectedCallback() {
    SessionService.desubscribeFromLogin(this.loginSubscription);
    SessionService.desubscribeFromLogout(this.logoutSubscription);
    NavigationService.desubscribeFromChangePage(this.changePageSubscription);
  }

  handleHomeClick(event) {
    event.preventDefault();
    NavigationService.emitChangePageEvent(routes['/home'].path);
  }

  handlePokemonListClick(event) {
    event.preventDefault();
    NavigationService.emitChangePageEvent(routes['/pokemons'].path);
  }

  handleLoginClick(event) {
    event.preventDefault();
    document.body.appendChild(document.createElement(AppLogin.tagName));
  }

  handleLogoutClick(event) {
    event.preventDefault();
    SessionService.emitLogoutEvent();
  }

  setActiveLink() {
    this.shadowRoot.querySelector('a.active')?.classList.remove('active');
    const activeAnchorId = this.#routeToAnchorMap[NavigationService.activeRoute.path];
    activeAnchorId && this.shadowRoot.getElementById(activeAnchorId).classList.add('active');
  }

  render() {
    const section = this.shadowRoot.getElementById('session-section');
    section.querySelector('a')?.remove();
    if (SessionService.loggedIn) {
      const logoutAnchor = document.createElement('a');
      logoutAnchor.textContent = `${SessionService.getSessionData().name} | Logout`;
      logoutAnchor.addEventListener('click', (event) => this.handleLogoutClick(event));
      section.appendChild(logoutAnchor);
    } else {
      const loginAnchor = document.createElement('a');
      loginAnchor.textContent = 'Login';
      loginAnchor.addEventListener('click', (event) => this.handleLoginClick(event));
      section.appendChild(loginAnchor);
    }
  }
}

export default AppHeader;
