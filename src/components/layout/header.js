import templateHTML from './my-header-template.html'; // Import the HTML template
import './my-header-style.css';  // Import the CSS file

class MyHeader extends HTMLElement {
  constructor() {
    super();

    // Create a shadow DOM for this component
    this.attachShadow({ mode: 'open' });

    // Parse the imported template
    const template = document.createElement('template');
    template.innerHTML = templateHTML;

    // Attach the template content to the shadow DOM
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

// Define the custom element
customElements.define('my-header', MyHeader);
