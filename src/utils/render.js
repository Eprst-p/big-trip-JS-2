import PointView from '../view/point-view.js';
import FormView from '../view/form-view.js';
import AbstractView from '../view/abstract-view.js';

const RenderPositions = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const renderElement = (container, element, place) => {
  const parent = container instanceof AbstractView ? container.element : container;
  const child = element instanceof AbstractView ? element.element : element;

  switch (place) {
    case RenderPositions.BEFOREBEGIN:
      parent.before(child);
      break;
    case RenderPositions.AFTERBEGIN:
      parent.prepend(child);
      break;
    case RenderPositions.BEFOREEND:
      parent.append(child);
      break;
    case RenderPositions.AFTEREND:
      parent.after(child);
      break;
  }
};

const createElementMarkup = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const replace = (container, newElement, oldElement) => {
  if (newElement === null || oldElement === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  const newChild = newElement instanceof AbstractView ? newElement.element : newElement;
  const oldChild = oldElement instanceof AbstractView ? oldElement.element : oldElement;

  container.replaceChild(newChild, oldChild);
};

//отрисовка точки
const renderPoint = (container, pointData) => {
  const pointElement = new PointView(pointData);
  const pointEditForm = new FormView('editForm', pointData);

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replace(container, pointElement, pointEditForm);
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointElement.setOnPointArrowClick(() => {
    replace(container, pointEditForm, pointElement);
    document.addEventListener('keydown', onEscKeyDown);
  });


  pointEditForm.setOnFormSubmit(() => {
    replace(container, pointElement, pointEditForm);
    document.removeEventListener('keydown', onEscKeyDown);
  });

  pointEditForm.setOnFormArrowClick(() => {
    replace(container, pointElement, pointEditForm);
    document.removeEventListener('keydown', onEscKeyDown);
  });

  renderElement(container, pointElement, RenderPositions.BEFOREEND);
};

//функция для вызова методов удаления
const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.element.remove();
  component.removeElement();
};

export {RenderPositions, renderElement, createElementMarkup, renderPoint, remove};
