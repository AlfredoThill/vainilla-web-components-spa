import NavigationService from '../../../services/navigation.service';

const config = {
  type: 'nav',
  requiredAttr: ['path'],
  observedAttr: ['active'],
};

class AppNav extends HTMLAnchorElement {
  static #tagName = 'app-nav';
  static get tagName() {
    return this.#tagName;
  }
  #path;

  constructor() {
    super();
    this.checkForRequiredAttributes();
    this.#path = this.getAttribute('path');
    this.addEventListener('click', this.handleClick);
  }

  handleClick(event) {
    event.preventDefault();
    NavigationService.emitChangePageEvent(this.#path);
  }

  static get observedAttributes() {
    return config.observedAttr;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'active' && oldValue !== newValue) {
      newValue != null ? this.classList.add('active') : this.classList.remove('active');
    }
  }

  checkForRequiredAttributes() {
    config.requiredAttr.forEach((attr) => {
      if (!this.hasAttribute(attr)) {
        throw new Error(`Attribute ${attr} is required for type ${config.type}`);
      }
    });
  }
}

export default AppNav;
