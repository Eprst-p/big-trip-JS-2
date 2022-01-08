import AbstractView from './abstract-view.js';

const DEFAULT_ACTIVE_BTN = 'table';

const TripTabs = [
  {
    id: 'table',
    tittle: 'Table'
  },
  {
    id: 'stats',
    tittle: 'Stats'
  }
];

const createMenuTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${TripTabs.map((tab) =>
    `<a id="${tab.id}" class="trip-tabs__btn ${tab.id === DEFAULT_ACTIVE_BTN ? 'trip-tabs__btn--active' : ''}" href="#">${tab.tittle}</a>`).join('')}
  </nav>`
);

class MenuView extends AbstractView {

  get template() {
    return createMenuTemplate();
  }

  setOnMenuTabClick = (callback) => {
    this._callbacksStorage.tabMenuClick = callback;
    this.element.addEventListener('click', this.#onMenuTabClick);
  }

  #onMenuTabClick = (evt) => {
    evt.preventDefault();
    const target = evt.target.closest('.trip-tabs__btn');

    if (!target) {
      return;
    }

    const activeTab = this.element.querySelector('.trip-tabs__btn--active');

    activeTab.classList.remove('trip-tabs__btn--active');
    target.classList.add('trip-tabs__btn--active');

    this._callbacksStorage.tabMenuClick(target.id);
  }
}

export default MenuView;
