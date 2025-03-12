class AppHeader extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById('header-template');
    const templateContent = template.content;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }
}

export default AppHeader;
