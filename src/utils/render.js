const RenderPositions = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
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
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {RenderPositions, renderElement, createElementMarkup};
