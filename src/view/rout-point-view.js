import {formDateValue} from '../utils/time-and-date.js';

const createLiTemplate = (pointObject) => {
  const {type, typeImg, city, dateFrom, dateTo, basePrice, offers, isFavorite} = pointObject;

  const editedStartTime = formDateValue(dateFrom).format('HH:mm');
  const editedEndTime = formDateValue(dateTo).format('HH:mm');
  const duration = dateTo - dateFrom;
  const editedDuration = formDateValue(duration).format('HH:mm');

  const shortDate = formDateValue(dateFrom).format('D MMM');

  const addFavoriteClass = isFavorite ? 'event__favorite-btn--active' : '';

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${formDateValue(dateFrom)}">${shortDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="${typeImg}" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${city}</h3>
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
          ${offers.map((currentOffer) => `<li class="event__offer">
          <span class="event__offer-title">${currentOffer.tittle}</span>
          ${currentOffer.currency};
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


export {createLiTemplate};
