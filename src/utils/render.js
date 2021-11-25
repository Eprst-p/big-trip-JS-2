const RenderPositions = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const renderTemplate = (container, template, renderPosition) => {
  container.insertAdjacentHTML(renderPosition, template);
};

export {RenderPositions, renderTemplate};
