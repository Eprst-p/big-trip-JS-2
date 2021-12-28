import FormView from '../view/form-view.js';
import {nanoid} from 'nanoid';
import {RenderPositions, renderElement, remove} from '../utils/render.js';
import {UserAction, UpdateType} from '../utils/constants.js';

class NewPointPresenter {
  #pointsListContainer = null;
  #changeData = null;
  #newFormComponent = null;

  constructor(pointsListContainer, changeData) {
    this.#pointsListContainer = pointsListContainer;
    this.#changeData = changeData;
  }

  init = () => {
    if (this.#newFormComponent !== null) {
      return;
    }

    this.#newFormComponent = new FormView();
    this.#newFormComponent.setOnFormSubmit(this.#onFormSubmit);
    this.#newFormComponent.setOnDeleteBtnClick(this.#onCancelClick);
    this.#newFormComponent.setDatepicker();

    renderElement(this.#pointsListContainer, this.#newFormComponent, RenderPositions.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  destroy = () => {
    if (this.#newFormComponent === null) {
      return;
    }
    const addBtn = document.querySelector('.trip-main__event-add-btn');
    addBtn.removeAttribute('disabled');

    remove(this.#newFormComponent);
    this.#newFormComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #onFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point},//сгенереный айди (пока нет сервера)
    );
    this.destroy();
  }

  #onCancelClick = () => {
    this.destroy();
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}

export default NewPointPresenter;
