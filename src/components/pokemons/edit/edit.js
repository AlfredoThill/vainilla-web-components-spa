class PokeEdit extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById('poke-edit-template');
    const templateContent = template.content;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }
}

export default PokeEdit;
