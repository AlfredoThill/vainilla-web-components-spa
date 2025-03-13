import { routes } from './../../routes.js';
import { buildChangePageEvent } from './../../../events/navigation.js';

class AppHeader extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById('header-template');
    const templateContent = template.content;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.getElementById('home-anchor').addEventListener('click', (event) => this.goHome(event));
  }

  goHome(event) {
    event.preventDefault();
    document.dispatchEvent(buildChangePageEvent(routes['/home'].path));
  }
}

export default AppHeader;
