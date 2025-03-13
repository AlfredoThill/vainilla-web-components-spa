import App from '../../app';

class PokeDetails extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById('poke-details-template');
    const templateContent = template.content;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  connectedCallback() {
    console.log('PokeDetails connected');
    console.log(App.activeRoute);
  }
}

export default PokeDetails;
