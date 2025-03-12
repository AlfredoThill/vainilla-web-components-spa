import App from './components/app.js';
import { AppHeader } from './components/layout';

function registerComponents() {
  customElements.define('app-root', App);
  customElements.define('app-header', AppHeader);
}

function bootstrap() {
  customElements.whenDefined('app-root').then(() => {
    document.getElementById('app').innerHTML = `
      <app-root></app-root>
    `;
  });
}

registerComponents();
bootstrap();
