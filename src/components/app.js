import NavigationService from '../services/navigation.service.js';

class App extends HTMLElement {
  singletonInstance;
  #activeTemplate;

  changePageSubscriber;

  constructor() {
    super();
    if (this.singletonInstance) {
      return this.singletonInstance;
    }
    this.singletonInstance = this;

    const template = document.getElementById('app-template');
    const templateContent = template.content;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateContent.cloneNode(true));

    this.changePageSubscriber = (_) => this.handleChangePage();
  }

  connectedCallback() {
    const currentRoute = NavigationService.defineLocationRouting();
    NavigationService.emitChangePageEvent(currentRoute.path, currentRoute.data);
    this.handleChangePage(NavigationService.activeRoute);
    NavigationService.subscribeToChangePage(this.changePageSubscriber);
  }

  disconnectedCallback() {
    NavigationService.desubscribeFromChangePage(this.changePageSubscriber);
  }

  handleChangePage() {
    this.#activeTemplate?.remove();

    const span = document.createElement('span');
    span.setAttribute('slot', 'active-template');
    span.appendChild(document.createElement(NavigationService.activeRoute.template));
    this.#activeTemplate = span;
    this.appendChild(span);
  }
}

export default App;
