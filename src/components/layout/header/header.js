import { routes } from './../../routes.js';
import SessionService from '../../../services/session.service.js';
import NavigationService from '../../../services/navigation.service.js';

import AppLogin from '../../login/login.js';

class AppHeader extends HTMLElement {
  static #tagName = 'app-header';
  static get tagName() {
    return this.#tagName;
  }

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
    this.shadowRoot.querySelector('a[active]')?.removeAttribute('active');
    this.shadowRoot.querySelector(`a[path="${NavigationService.activeRoute.path}"]`)?.setAttribute('active', '');
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
