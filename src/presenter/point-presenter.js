import {RenderPositions, renderElement, replace, remove} from '../utils/render.js';
import PointView from '../view/point-view.js';
import FormView from '../view/form-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  OPENED_FORM: 'OPENED_FORM',
};

class PointPresenter {
  #pointContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointElement = null;
  #pointEditForm = null;
  #pointData = null;

  #mode = Mode.DEFAULT;

  constructor (container, changeData, changeMode) {
    this.#pointContainer = container;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (pointData) => {
    this.#pointData = pointData;

    const prevPointElement = this.#pointElement;
    const prevPointEditForm = this.#pointEditForm;

    this.#pointElement = new PointView(this.#pointData);
    this.#pointEditForm = new FormView('editForm', this.#pointData);

    this.#pointEditForm.setOnFormSubmit(this.#formSubmit);
    this.#pointElement.setOnPointArrowClick(this.#pointArrowClick);
    this.#pointEditForm.setOnFormArrowClick(this.#formArrowClick);
    this.#pointElement.setOnFavoriteStarClick(this.#favoriteStarClick);

    this.#pointEditForm.setOnTypeChange();


    if (prevPointElement === null || prevPointEditForm === null) {
      renderElement(this.#pointContainer, this.#pointElement, RenderPositions.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointContainer, this.#pointElement, prevPointElement);
    }

    if (this.#mode === Mode.OPENED_FORM) {
      replace(this.#pointContainer, this.#pointEditForm, prevPointEditForm);
    }

    remove(prevPointElement);
    remove(prevPointEditForm);
  }

  destroy = () => {
    remove(this.#pointElement);
    remove(this.#pointEditForm);
  }

  resetViewToDefault = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm = () => {
    replace(this.#pointContainer, this.#pointEditForm, this.#pointElement);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.OPENED_FORM;
  }

  #replaceFormToPoint = () => {
    replace(this.#pointContainer, this.#pointElement, this.#pointEditForm);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #pointArrowClick = () => {
    this.#replacePointToForm();
  }

  #formSubmit = () => {
    this.#replaceFormToPoint();
  }

  #formArrowClick = () => {
    this.#replaceFormToPoint();
  }

  //тут происходит установка обработчика и вызов чендждаты при нажатии
  //чендж дата - это по сути метод #onPointChange из большого презентера, только с передачей параметра в виде нового измененного объекта
  #favoriteStarClick = () => {
    this.#changeData({...this.#pointData, isFavorite: !this.#pointData.isFavorite});
  }
}

export default PointPresenter;
