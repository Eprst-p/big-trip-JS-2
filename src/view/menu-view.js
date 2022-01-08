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
  #tabBtns = Array.from(this.element.querySelectorAll('.trip-tabs__btn'));

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

    if (!this.#tabBtns.includes(evt.target)) {
      return;
    }

    const target = evt.target.id;

    const activeTab = this.element.querySelector('.trip-tabs__btn--active');
    const targetTab = this.element.querySelector(`#${target}`);

    if (target === TripTabsTypes.TABLE) {
      activeTab.classList.remove('trip-tabs__btn--active');
      targetTab.classList.add('trip-tabs__btn--active');
    }
    if (target === TripTabsTypes.STATS) {
      activeTab.classList.remove('trip-tabs__btn--active');
      targetTab.classList.add('trip-tabs__btn--active');
    }

    this._callbacksStorage.tabMenuClick(target);
  }
}

export default MenuView;
