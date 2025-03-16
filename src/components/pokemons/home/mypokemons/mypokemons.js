class MyPokemons extends HTMLElement {
  static #tagName = 'my-pokemons';
  static get tagName() {
    return MyPokemons.#tagName;
  }

  constructor() {
    super();
    const template = document.getElementById('my-pokemons-template');
    const templateContent = template.content;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }
}

export default MyPokemons;
