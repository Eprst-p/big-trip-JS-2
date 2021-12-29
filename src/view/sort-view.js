import AbstractView from './abstract-view.js';
import {SORT_ITEMS}  from '../utils/constants.js';

const createSortTemplate = (currentSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SORT_ITEMS.map((currentItem) => `
    <div class="trip-sort__item  trip-sort__item--${currentItem.type}">
      <input id="sort-${currentItem.type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${currentItem.type}" ${currentSortType === `sort-${currentItem.type}` ? 'checked' : ''} ${currentItem.isDisabled ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${currentItem.type}">${currentItem.title}</label>
    </div>`).join('')}
  </form>`
);

class SortView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  setOnSortTypeChange = (callback) => {
    this._callbacksStorage.sortTypeChange = callback;
    this.element.addEventListener('change', this.#onSortTypeChange);
  }

  #onSortTypeChange = (evt) => {
    evt.preventDefault();
    const sortType = evt.target.id;
    this._callbacksStorage.sortTypeChange(sortType);
  }
}

export default SortView;
