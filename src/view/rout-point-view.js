import dayjs from 'dayjs';

const createLiTemplate = (pointObject) => {
  const {date, _type, typeImg, city, time, price, offers, favorite} = pointObject;

  const {startTime, endTime, durationTime} = time;

  const shortDate = dayjs(date).format('D MMM');

  const renderOffer = (name, currency, offerPrice) => (
    `<li class="event__offer">
      <span class="event__offer-title">${name}</span>
      ${currency};
      <span class="event__offer-price">${offerPrice}</span>
    </li>`
  );

  let allOffers = '';
  offers.forEach((currentOffer) => {
    allOffers += renderOffer(currentOffer._name, currentOffer.currency, currentOffer.offerPrice);
  });

  let favoriteActive = '';
  const isFavorite = () => {
    if (favorite) {
      favoriteActive = 'event__favorite-btn--active';
    }
    return favoriteActive;
  };

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${date}">${shortDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="${typeImg}" alt="Event type icon">
        </div>
        <h3 class="event__title">${_type} ${city}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${endTime}</time>
          </p>
          <p class="event__duration">${durationTime}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${allOffers}
        </ul>
        <button class="event__favorite-btn ${isFavorite()}" type="button">
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
