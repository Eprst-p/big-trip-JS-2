import AbstractView from './abstract-view.js';

const createAddPointButtonTemplate = () => (
  '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>'
);

class AddPointButtonView extends AbstractView  {
  get template() {
    return createAddPointButtonTemplate();
  }

  setOnAddPointCLick = (callback) => {
    this._callbacksStorage.onButtonClick = callback;
    this.element.addEventListener('click', this.#onAddPointCLick);
  }

  #onAddPointCLick = (evt) => {
    evt.preventDefault();
    this._callbacksStorage.onButtonClick();
    this.element.setAttribute('disabled', 'disabled');
  }
}

export default AddPointButtonView;
