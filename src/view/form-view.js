import {OFFER_NAMES, PRICES, POINT_TYPES} from '../mock/data-sources.js';


const createTypeListTemplate = () => {

  let readyTypeList = '';
  const renderType = (type) => {
    const lowerType = type.toLowerCase();
    return (
      `<div class="event__type-item">
        <input id="event-type-${lowerType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowerType}">
        <label class="event__type-label  event__type-label--${lowerType}" for="event-type-${lowerType}-1">${type}</label>
      </div>`
    );
  };

  POINT_TYPES.forEach((currentType) => {
    readyTypeList += renderType(currentType);
  });

  return readyTypeList;
};

const createTypeAndCityTextTemplate = (_type, city) => (
  `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${_type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
    <datalist id="destination-list-1">
      <option value="Amsterdam"></option>
      <option value="Geneva"></option>
      <option value="Chamonix"></option>
    </datalist>
  </div>`
);

const createTimeTemplate = () => (
  `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
  </div>`
);

const createPriceTemplate = (price) => (
  `<div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
  </div>`
);

const createOffersTemplate = (offers) => {

  const checkChosenOffer = (index) => {
    let check = '';
    offers.forEach((currentOffer) => {
      if (currentOffer._name === OFFER_NAMES[index]) {
        check = 'checked';
      }
    });
    return check;
  };

  let readyTemplate = '';
  const names = ['luggage', 'comfort', 'meal', 'seats', 'train'];
  for (let i = 0; i < 5; i++) {
    const renderTemplate = () => (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${names[i]}-1" type="checkbox" name="event-offer-${names[i]}" ${checkChosenOffer(i)}>
        <label class="event__offer-label" for="event-offer-${names[i]}-1">
          <span class="event__offer-title">${OFFER_NAMES[i]}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${PRICES[i]}</span>
        </label>
      </div>`
    );
    readyTemplate += renderTemplate();
  }

  return readyTemplate;
};

const createDestinationAndPicturesTEmplate = (destination, pictures) => {

  const renderPictures = (pictureUrl) => (
    `<img class="event__photo" src="${pictureUrl}" alt="Event photo">`
  );

  let allPictures = '';
  pictures.forEach((currentPictureUrl) => {
    allPictures += renderPictures(currentPictureUrl);
  });

  return (
    `<p class="event__destination-description">${destination}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${allPictures}
      </div>
    </div>`
);
};


//основной темплейт
const createFormTemplate = (pointObject) => {
  const {date, _type, typeImg, city, time, price, offers, destination, pictures} = pointObject;

  return (
    `<form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="${typeImg}" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createTypeListTemplate()}
            </fieldset>
          </div>
        </div>
        ${createTypeAndCityTextTemplate(_type, city)}
        ${createTimeTemplate()}
        ${createPriceTemplate(price)}
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createOffersTemplate(offers)}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          ${createDestinationAndPicturesTEmplate(destination, pictures)}
        </section>
      </section>
    </form>`
  );
};

export {createFormTemplate};
