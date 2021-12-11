import {RenderPositions, renderElement, replace, remove} from '../utils/render.js';
import PointView from '../view/point-view.js';
import FormView from '../view/form-view.js';

class PointPresenter {
  #pointContainer = null;

  #pointElement = null;
  #pointEditForm = null;

  #pointData = null;

  constructor (container) {
    this.#pointContainer = container;
  }

  init = (pointData) => {
    this.#pointData = pointData;

    const prevPointElement = this.#pointElement;
    const prevPointEditForm = this.#pointEditForm;

    this.#pointElement = new PointView(this.#pointData);
    this.#pointEditForm = new FormView('editForm', this.#pointData);

    this.#pointArrowClick();
    this.#formSubmit();
    this.#formArrowClick();

    if (prevPointElement === null || prevPointEditForm === null) {
      renderElement(this.#pointContainer, this.#pointElement, RenderPositions.BEFOREEND);
    }

    if (this.#pointContainer.contains(prevPointElement)) {
      replace(this.#pointElement, prevPointElement);
    }

    if (this.#pointContainer.contains(prevPointEditForm)) {
      replace(this.#pointEditForm, prevPointEditForm);
    }

    remove(prevPointElement);
    remove(prevPointEditForm);
  }

  destroy = () => {
    remove(this.#pointContainer);
    remove(this.#pointEditForm);
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replace(this.#pointContainer, this.#pointElement, this.#pointEditForm);
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #pointArrowClick = () => {
    this.#pointElement.setOnPointArrowClick(() => {
      replace(this.#pointContainer, this.#pointEditForm, this.#pointElement);
      document.addEventListener('keydown', this.#onEscKeyDown);
    });
  }

  #formSubmit = () => {
    this.#pointEditForm.setOnFormSubmit(() => {
      replace(this.#pointContainer, this.#pointElement, this.#pointEditForm);
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });
  }

  #formArrowClick = () => {
    this.#pointEditForm.setOnFormArrowClick(() => {
      replace(this.#pointContainer, this.#pointElement, this.#pointEditForm);
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });
  }
}

export default PointPresenter;
