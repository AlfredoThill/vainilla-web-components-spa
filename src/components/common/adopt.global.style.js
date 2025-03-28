export class AdoptGlobalStyles extends HTMLElement {
  static #tagName = 'global-styles';
  static get tagName() {
    return this.#tagName;
  }

  connectedCallback() {
    addGlobalStylesToShadowRoot(this.getRootNode());
    this.remove();
  }
}

export default AdoptGlobalStyles;

let globalSheets = null;

export function getGlobalStyleSheets() {
  if (globalSheets === null) {
    globalSheets = Array.from(document.styleSheets).map((x) => {
      const sheet = new CSSStyleSheet();
      const css = Array.from(x.cssRules)
        .map((rule) => rule.cssText)
        .join(' ');
      sheet.replaceSync(css);
      return sheet;
    });
  }

  return globalSheets;
}

export function addGlobalStylesToShadowRoot(shadowRoot) {
  shadowRoot.adoptedStyleSheets.push(...getGlobalStyleSheets());
}
