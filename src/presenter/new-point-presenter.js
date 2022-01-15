import FormView from '../view/form-view.js';
import {RenderPositions, renderElement, remove} from '../utils/render.js';
import {UserAction, UpdateType, FORM_TYPES} from '../utils/constants.js';
import {defaultData} from '../utils/deafault-data.js';

class NewPointPresenter {
  #pointsListContainer = null;
  #changeData = null;
  #newFormComponent = null;
  #allPossisbleOffers = null;
  #allDestinations = null;

  constructor(pointsListContainer, changeData) {
    this.#pointsListContainer = pointsListContainer;
    this.#changeData = changeData;
  }

  init = (allPossisbleOffers, allDestinations) => {
    if (this.#newFormComponent !== null) {
      return;
    }

    this.#allPossisbleOffers = allPossisbleOffers;
    this.#allDestinations = allDestinations;
    this.#newFormComponent = new FormView(FORM_TYPES.NEW_FORM, defaultData, this.#allPossisbleOffers, this.#allDestinations);
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
      point,
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
