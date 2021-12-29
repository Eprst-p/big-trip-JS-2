import {formDayjsFromStr, getDateInFormat, getDuration} from '../utils/time-and-date.js';
import AbstractView from './abstract-view.js';

const createLiTemplate = (pointData) => {
  const {type, typeImg, dateFrom, dateTo, basePrice, offers, isFavorite, destination} = pointData;

  const startDayjs = formDayjsFromStr(dateFrom, 'DD MM YY HH:mm');
  const endDayjs = formDayjsFromStr(dateTo, 'DD MM YY HH:mm');

  const editedStartTime = getDateInFormat(startDayjs, 'HH:mm');
  const editedEndTime = getDateInFormat(endDayjs, 'HH:mm');
  const editedDuration = getDuration(endDayjs, startDayjs).format('HH:mm');
  const shortDate = getDateInFormat(startDayjs, 'D MMM');

  const addFavoriteClass = isFavorite ? 'event__favorite-btn--active' : '';

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${startDayjs}">${shortDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="${typeImg}" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${editedStartTime}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${editedEndTime}</time>
          </p>
          <p class="event__duration">${editedDuration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offers.offers.map((currentOffer) => `<li class="event__offer">
          <span class="event__offer-title">${currentOffer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${currentOffer.offerPrice}</span>
        </li>`).join('')}
        </ul>
        <button class="event__favorite-btn ${addFavoriteClass}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

class PointView extends AbstractView {
  #pointData = null;

  constructor(pointData) {
    super();
    this.#pointData = pointData;
  }

  get template() {
    return createLiTemplate(this.#pointData);
  }

  setOnPointArrowClick = (callback) => {
    this._callbacksStorage.arrowClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onArrowClick);
  }

  #onArrowClick = (evt) => {
    evt.preventDefault();
    this._callbacksStorage.arrowClick();
  }

  setOnFavoriteStarClick = (callback) => {
    this._callbacksStorage.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#onfavoriteStarClick);
  }

  #onfavoriteStarClick = (evt) => {
    evt.preventDefault();
    this._callbacksStorage.favoriteClick();
  }
}

export default PointView;
