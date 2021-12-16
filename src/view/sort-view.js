import AbstractView from './abstract-view.js';
import {SortType}  from '../utils/constants.js';


const createSortTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" data-sort-type="${SortType.DAY}" checked>
      <label class="trip-sort__btn" for="sort-day">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" data-sort-type="${SortType.DURATION_UP}">
      <label class="trip-sort__btn" for="sort-time">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" data-sort-type="${SortType.PRICE_UP}">
      <label class="trip-sort__btn" for="sort-price">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`
);

class SortView extends AbstractView {
  get template() {
    return createSortTemplate();
  }

  setOnSortTypeChange = (callback) => {
    this._callbacksStorage.sortTypeChange = callback;
    //тут надо бы сделать один обработчик через делегирование
    this.element.querySelector('#sort-day').addEventListener('change', this.#onSortTypeChange);
    this.element.querySelector('#sort-time').addEventListener('change', this.#onSortTypeChange);
    this.element.querySelector('#sort-price').addEventListener('change', this.#onSortTypeChange);
  }

  #onSortTypeChange = (evt) => {
    /*if (evt.target.tagName !== 'INPUT') {
      return;
    }*/

    evt.preventDefault();
    this._callbacksStorage.sortTypeChange(evt.target.dataset.sortType);
  }

}


export default SortView;
