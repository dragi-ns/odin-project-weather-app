function render(child, parentElement, replace = false) {
  if (replace) {
    parentElement.replaceChild(child, parentElement.lastElementChild);
    return child;
  }
  return parentElement.appendChild(child);
}

function createElement({
  tagName = 'div',
  attributes = {},
  content = null,
  useInnerHTML = false,
  children = [],
  events = [],
}) {
  const element = document.createElement(tagName);

  Object.keys(attributes).forEach((attribute) => {
    element.setAttribute(attribute, attributes[attribute]);
  });

  if (content) {
    if (useInnerHTML) {
      element.innerHTML = content;
    } else {
      element.textContent = content;
    }
  }

  children.forEach((child) => render(child, element));

  events.forEach((event) => {
    element.addEventListener(event.name, event.handler);
  });

  return element;
}

function createEvent(name, handler) {
  return { name, handler };
}

export { render, createElement, createEvent };
