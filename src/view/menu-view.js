import AbstractView from './abstract-view.js';
import {TripTabs, TripTabsTypes} from '../utils/constants.js';

const createMenuTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${TripTabs.map((tab) =>
    `<a id="${tab.id}" class="trip-tabs__btn" href="#">${tab.tittle}</a>`).join('')}
  </nav>`
);

class MenuView extends AbstractView {
  #tableBtn = this.element.querySelector('#table');
  #statsBtn = this.element.querySelector('#stats');

  constructor() {
    super();
    this.#tableBtn.classList.add('trip-tabs__btn--active');
  }

  get template() {
    return createMenuTemplate();
  }

  setOnMenuTabClick = (callback) => {
    this._callbacksStorage.tabMenuClick = callback;
    this.element.addEventListener('click', this.#onMenuTabClick);
  }

  #onMenuTabClick = (evt) => {
    evt.preventDefault();
    const targetTab = evt.target.id;
    if (targetTab === TripTabsTypes.TABLE) {
      this.#statsBtn.classList.remove('trip-tabs__btn--active');
      this.#tableBtn.classList.add('trip-tabs__btn--active');
    }
    if (targetTab === TripTabsTypes.STATS) {
      this.#tableBtn.classList.remove('trip-tabs__btn--active');
      this.#statsBtn.classList.add('trip-tabs__btn--active');
    }

    this._callbacksStorage.tabMenuClick(targetTab);
  }
}

export default MenuView;
