export function createSlot(name, element = 'span') {
  const span = document.createElement(element);
  span.setAttribute('slot', name);
  return span;
}
