import {RenderPositions, renderElement, replace, remove} from '../utils/render.js';
import PointView from '../view/point-view.js';
import FormView from '../view/form-view.js';

class PointPresenter {
  #pointContainer = null;
  #changeData = null;

  #pointElement = null;
  #pointEditForm = null;

  #pointData = null;

  constructor (container, changeData) {
    this.#pointContainer = container;
    this.#changeData = changeData;
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

    if (prevPointElement === null || prevPointEditForm === null) {
      renderElement(this.#pointContainer, this.#pointElement, RenderPositions.BEFOREEND);
      return;
    }

    //закомменчено - т.к иначе будет ошибка еще на этапе отрисовки
    if (this.#pointContainer.contains(prevPointElement.element)) {
      replace(this.#pointContainer, this.#pointElement, prevPointElement);
    }

    if (this.#pointContainer.contains(prevPointEditForm.element)) {
      replace(this.#pointContainer, this.#pointEditForm, prevPointEditForm);
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
    replace(this.#pointContainer, this.#pointEditForm, this.#pointElement);
    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  #formSubmit = () => {
    replace(this.#pointContainer, this.#pointElement, this.#pointEditForm);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #formArrowClick = () => {
    replace(this.#pointContainer, this.#pointElement, this.#pointEditForm);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  //тут происходит установка обработчика и вызов чендждаты при нажатии
  //чендж дата - это по сути метод #onPointChange из большого презентера, только с передачей параметра в виде нового измененного объекта
  #favoriteStarClick = () => {
    this.#changeData({...this.#pointData, isFavorite: !this.#pointData.isFavorite});
  }
}

export default PointPresenter;
