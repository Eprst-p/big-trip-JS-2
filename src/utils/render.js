import PointView from '../view/point-view.js';
import FormView from '../view/form-view.js';

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

const renderPoint = (container, pointData) => {
  const pointElement = new PointView(pointData);
  const pointEditForm = new FormView('editForm', pointData);

  const replacePointToForm = () => {
    container.replaceChild(pointEditForm.element, pointElement.element);
  };

  const replaceFormToPoint = () => {
    container.replaceChild(pointElement.element, pointEditForm.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointElement.setOnPointArrowClick(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });


  pointEditForm.setOnFormSubmit(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  pointEditForm.setOnFormArrowClick(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  renderElement(container, pointElement.element, RenderPositions.BEFOREEND);
};

export {RenderPositions, renderElement, createElementMarkup, renderPoint};
