import { routes } from './../../routes.js';
import { buildChangePageEvent } from './../../../events/navigation.js';
import { sessionEvents } from '../../../events/session.js';
import SessionService from './../../../state/session.service.js';

class AppHeader extends HTMLElement {
  loginListener;

  constructor() {
    super();

    const template = document.getElementById('header-template');
    const templateContent = template.content;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateContent.cloneNode(true));

    this.loginListener = (event) => this.handleLoginEvent(event);
  }

  connectedCallback() {
    this.shadowRoot.getElementById('home-anchor').addEventListener('click', (event) => this.goHome(event));
    this.render();
    document.addEventListener(sessionEvents.login, this.loginListener);
  }

  disconnectedCallback() {
    document.removeEventListener(sessionEvents.login, this.loginListener);
  }

  goHome(event) {
    event.preventDefault();
    document.dispatchEvent(buildChangePageEvent(routes['/home'].path));
  }

  openLogin(event) {
    event.preventDefault();
    document.body.appendChild(document.createElement('app-login'));
  }

  handleLoginEvent(event) {
    console.log(event);
    this.render();
  }

  render() {
    const section = this.shadowRoot.getElementById('session-section');
    section.innerHTML = '';
    if (SessionService.loggedIn) {
      const logoutAnchor = document.createElement('a');
      logoutAnchor.textContent = 'Logout';
      section.appendChild(logoutAnchor);
    } else {
      const loginAnchor = document.createElement('a');
      loginAnchor.textContent = 'Login';
      loginAnchor.addEventListener('click', (event) => this.openLogin(event));
      section.appendChild(loginAnchor);
    }
  }
}

export default AppHeader;
