class PokeEdit extends HTMLElement {
  static #tagName = 'poke-edit';
  static get tagName() {
    return this.#tagName;
  }

  constructor() {
    super();
    const template = document.getElementById('poke-edit-template');
    const templateContent = template.content;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }
}

export default PokeEdit;
