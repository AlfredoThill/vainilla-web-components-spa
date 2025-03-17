import { routes } from './../../routes.js';
import SessionService from '../../../services/session.service.js';
import NavigationService from '../../../services/navigation.service.js';

import { createSlot } from '../../../utils/slot.js';

import AppLogin from '../../login/login.js';

class AppHeader extends HTMLElement {
  static #tagName = 'app-header';
  static get tagName() {
    return this.#tagName;
  }
  #sessionSlot;

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
    this.#sessionSlot?.remove();
    const slot = createSlot('session-slot');
    if (SessionService.loggedIn) {
      slot.textContent = `${SessionService.getSessionData().name} | Logout`;
      slot.addEventListener('click', (event) => this.handleLogoutClick(event));
    } else {
      slot.textContent = 'Login';
      slot.addEventListener('click', (event) => this.handleLoginClick(event));
    }
    this.#sessionSlot = slot;
    this.appendChild(slot);
  }
}

export default AppHeader;
