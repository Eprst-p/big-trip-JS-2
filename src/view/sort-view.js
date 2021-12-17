import AbstractView from './abstract-view.js';
import {SORT_ITEMS}  from '../utils/constants.js';

const createSortTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SORT_ITEMS.map((currentItem) => `
    <div class="trip-sort__item  trip-sort__item--${currentItem.type}">
      <input id="sort-${currentItem.type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${currentItem.type}" ${currentItem.isChecked}>
      <label class="trip-sort__btn" for="sort-${currentItem.type}">${currentItem.tittle}</label>
    </div>`).join('')}
  </form>`
);

class SortView extends AbstractView {
  get template() {
    return createSortTemplate();
  }

  setOnSortTypeChange = (callback) => {
    this._callbacksStorage.sortTypeChange = callback;
    this.element.addEventListener('change', this.#onSortTypeChange);
  }

  #onSortTypeChange = (evt) => {
    evt.preventDefault();
    const sortType = evt.target.id.slice(5);
    this._callbacksStorage.sortTypeChange(sortType);
  }
}

export default SortView;
