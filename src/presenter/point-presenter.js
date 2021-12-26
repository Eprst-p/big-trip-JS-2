import {RenderPositions, renderElement, replace, remove} from '../utils/render.js';
import PointView from '../view/point-view.js';
import FormView from '../view/form-view.js';
import {UserAction, UpdateType} from '../utils/constants.js';


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
    this.#pointEditForm.setOnFormArrowClick(this.#formArrowClick);
    this.#pointEditForm.setOnDeleteBtnClick(this.#deleteBtnClick);
    this.#pointElement.setOnPointArrowClick(this.#pointArrowClick);
    this.#pointElement.setOnFavoriteStarClick(this.#favoriteStarClick);

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

  //обработчики
  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditForm.reset(this.#pointData);
      this.#replaceFormToPoint();
    }
  };

  #pointArrowClick = () => {
    this.#replacePointToForm();
  }

  #formSubmit = (update) => {
    //тут позже можно ввести проверку на минор/патч isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH (на месте UpdateType.MINOR) - патч - это офферы
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      update,
    );
    this.#replaceFormToPoint();
  }

  #formArrowClick = () => {
    this.#pointEditForm.reset(this.#pointData);
    this.#replaceFormToPoint();
  }

  #deleteBtnClick = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  }

  #favoriteStarClick = () => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#pointData, isFavorite: !this.#pointData.isFavorite},
    );
  }


  //реплейсы и ресеты
  destroy = () => {
    remove(this.#pointElement);
    remove(this.#pointEditForm);
  }

  resetViewToDefault = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditForm.reset(this.#pointData);
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm = () => {
    replace(this.#pointContainer, this.#pointEditForm, this.#pointElement);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#pointEditForm.setDatepicker();
    this.#changeMode();
    this.#mode = Mode.OPENED_FORM;
  }

  #replaceFormToPoint = () => {
    replace(this.#pointContainer, this.#pointElement, this.#pointEditForm);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#pointEditForm.removeElement();
    this.#mode = Mode.DEFAULT;
  }
}

export default PointPresenter;
