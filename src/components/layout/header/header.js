import { routes } from './../../routes.js';
import { buildChangePageEvent } from './../../../events/navigation.js';
import SessionService from '../../../services/session.service.js';

class AppHeader extends HTMLElement {
  static #tagName = 'app-header';
  static get tagName() {
    return this.#tagName;
  }

  loginSubscription;
  logoutSubscription;

  constructor() {
    super();

    const template = document.getElementById('header-template');
    const templateContent = template.content;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateContent.cloneNode(true));

    this.loginSubscription = (_) => this.render();
    this.logoutSubscription = (_) => this.render();
  }

  connectedCallback() {
    this.shadowRoot.getElementById('home-anchor').addEventListener('click', (event) => this.goHome(event));
    this.render();
    SessionService.subscribeToLogin(this.loginSubscription);
    SessionService.subscribeToLogout(this.logoutSubscription);
  }

  disconnectedCallback() {
    SessionService.desubscribeFromLogin(this.loginSubscription);
    SessionService.desubscribeFromLogout(this.logoutSubscription);
  }

  goHome(event) {
    event.preventDefault();
    document.dispatchEvent(buildChangePageEvent(routes['/home'].path));
  }

  handleLoginClick(event) {
    event.preventDefault();
    document.body.appendChild(document.createElement('app-login'));
  }

  handleLogoutClick(event) {
    event.preventDefault();
    SessionService.clearSessionData();
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
