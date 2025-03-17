import { login } from './../../api/auth.api';
import SessionService from '../../services/session.service.js';

class AppLogin extends HTMLElement {
  static #tagName = 'app-login';
  static get tagName() {
    return this.#tagName;
  }

  constructor() {
    super();
    const template = document.getElementById('login-template');
    const templateContent = template.content;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.getElementById('login-form').addEventListener('submit', (event) => this.handleLogin(event));
    this.shadowRoot.getElementById('cancel').addEventListener('click', (event) => this.handleCancel(event));
  }

  handleLogin(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const { email, password } = Object.fromEntries(data);
    login(email, password).then((response) => {
      SessionService.emitLoginEvent({ email: response.email, name: response.name });
      this.remove();
    });
  }

  handleCancel() {
    this.remove();
  }
}

export default AppLogin;
