const RenderPositions = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const renderTemplate = (container, template, renderPosition) => {
  container.insertAdjacentHTML(renderPosition, template);
};

const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPositions.BEFOREBEGIN:
      container.before(element);
      break;
    case RenderPositions.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPositions.BEFOREEND:
      container.append(element);
      break;
    case RenderPositions.AFTEREND:
      container.after(element);
      break;
  }
};

const createElementMarkup = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};

export {RenderPositions, renderTemplate, renderElement, createElementMarkup};
