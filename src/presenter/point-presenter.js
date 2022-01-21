import {RenderPositions, renderElement, replace, remove} from '../utils/render.js';
import PointView from '../view/point-view.js';
import FormView from '../view/form-view.js';
import {UserAction, UpdateType, FORM_TYPES, State, ESC_KEYS} from '../utils/constants.js';

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
  #allPossisbleOffers = null;
  #allDestinations = null;

  #mode = Mode.DEFAULT;

  constructor (container, changeData, changeMode) {
    this.#pointContainer = container;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (pointData, allPossisbleOffers, allDestinations) => {
    this.#pointData = pointData;
    this.#allPossisbleOffers = allPossisbleOffers;
    this.#allDestinations = allDestinations;

    const prevPointElement = this.#pointElement;
    const prevPointEditForm = this.#pointEditForm;

    this.#pointElement = new PointView(this.#pointData);
    this.#pointEditForm = new FormView(FORM_TYPES.EDIT_FORM, this.#pointData, this.#allPossisbleOffers, this.#allDestinations);

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
      replace(this.#pointContainer, this.#pointElement, prevPointEditForm);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointElement);
    remove(prevPointEditForm);
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

  setViewState = (state) => {
    if (this.#mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this.#pointEditForm.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this.#pointEditForm.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this.#pointEditForm.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this.#pointElement.shake(resetFormState);
        this.#pointEditForm.shake(resetFormState);
        break;
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
    this.removeEscListener();
    this.#pointEditForm.destroyDatepicker();
    this.#mode = Mode.DEFAULT;
  }

  //обработчики
  removeEscListener = () => {
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #onEscKeyDown = (evt) => {
    if (ESC_KEYS.includes(evt.key)) {
      evt.preventDefault();
      this.#pointEditForm.reset(this.#pointData);
      this.#replaceFormToPoint();
    }
  };

  #pointArrowClick = () => {
    this.#replacePointToForm();
  }

  #formSubmit = (update) => {
    this.removeEscListener();
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      update,
    );
  }

  #formArrowClick = () => {
    this.#pointEditForm.reset(this.#pointData);
    this.#replaceFormToPoint();
  }

  #deleteBtnClick = (point) => {
    this.removeEscListener();
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
}

export default PointPresenter;
