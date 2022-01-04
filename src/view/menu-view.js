import AbstractView from './abstract-view.js';
import {TripTabs} from '../utils/constants.js';

const createMenuTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a id="${TripTabs.TABLE}" class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
    <a id="${TripTabs.STATS}" class="trip-tabs__btn" href="#">Stats</a>
  </nav>`
);

class MenuView extends AbstractView {
  #tableBtn = this.element.querySelector('#table');
  #statsBtn = this.element.querySelector('#stats');

  get template() {
    return createMenuTemplate();
  }

  setOnTableClick = (callback) => {
    this._callbacksStorage.tableClick = callback;
    this.#tableBtn.addEventListener('click', this.#onTableClick);
  }

  #onTableClick = (evt) => {
    evt.preventDefault();
    this.#statsBtn.classList.remove('trip-tabs__btn--active');
    this.#tableBtn.classList.remove('trip-tabs__btn--active');
    this.#tableBtn.classList.add('trip-tabs__btn--active');
    this._callbacksStorage.tableClick();
  }

  setOnStatsClick = (callback) => {
    this._callbacksStorage.statsClick = callback;
    this.#statsBtn.addEventListener('click', this.#onStatsClick);
  }

  #onStatsClick = (evt) => {
    evt.preventDefault();
    this.#statsBtn.classList.remove('trip-tabs__btn--active');
    this.#tableBtn.classList.remove('trip-tabs__btn--active');
    this.#statsBtn.classList.add('trip-tabs__btn--active');
    this._callbacksStorage.statsClick();
  }


}

export default MenuView;
