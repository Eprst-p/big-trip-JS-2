import {PRICES, POINT_TYPES, OFFERS_BY_TYPE} from '../utils/constants.js';
import flatpickr from 'flatpickr';//пока не используется
import {formDateValue, getDateInFormat} from '../utils/time-and-date.js';
import SmartView from './smart-view.js';
import {CITIES} from '../mock/data-sources.js';
import {generateDestinationsText, createPictures} from '../mock/gen-data.js';


const createTypeAndCityTextTemplate = (type, city) => (
  `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
    <datalist id="destination-list-1">
    ${CITIES.map((currentCity) => `
      <option value="${currentCity}"></option>`).join('')}
    </datalist>
  </div>`
);

const createTimeTemplate = (startTime, endTime) => {
  const editedStartTime = getDateInFormat(startTime, 'DD MM YY HH:mm');//немного не тот формат, но принцип моков выполняется
  const editedEndTime = getDateInFormat(endTime, 'DD MM YY HH:mm');

  return (
    `<div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${editedStartTime}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${editedEndTime}">
    </div>`
  );
};


const createPriceTemplate = (price) => (
  `<div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
  </div>`
);

const createOffersTemplate = (offers, pointType) => {

  const checkChosenOffer = (index) => {
    let check = '';
    offers.forEach((currentOffer) => {
      if (currentOffer.tittle === OFFERS_BY_TYPE[pointType][index]) {
        check = 'checked';
      }
    });
    return check;
  };

  const names = OFFERS_BY_TYPE[pointType];

  return (
    names.map((offerName, index) => `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerName}-1" type="checkbox" name="event-offer-${offerName}" ${checkChosenOffer(index)}>
      <label class="event__offer-label" for="event-offer-${offerName}-1">
        <span class="event__offer-title">${offerName}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${PRICES[index]}</span>
      </label>
    </div>`).join('')
  );
};

//основной темплейт
const createFormTemplate = (formType, pointData = {}) => {

  const {
    basePrice = '300$',
    dateFrom = formDateValue(),
    dateTo = formDateValue(),
    destination = {
      description: 'In the name of the Empero',
      name: '',
      pictures: [],
    },
    offers = {
      type: POINT_TYPES[5].toLowerCase(),
      offers: [],
    },
    type = POINT_TYPES[5].toLowerCase(),
    typeImg = `img/icons/${POINT_TYPES[5].toLowerCase()}.png`,
  } = pointData;

  const showRollBtn = (formType === 'editForm') ?
    `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>` :
    '';

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
              ${POINT_TYPES.map((currentType) => `<div class="event__type-item">
              <input id="event-type-${currentType.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${currentType.toLowerCase()}">
              <label class="event__type-label  event__type-label--${currentType.toLowerCase()}" for="event-type-${currentType.toLowerCase()}-1">${currentType}</label>
            </div>`).join('')}
            </fieldset>
          </div>
        </div>
        ${createTypeAndCityTextTemplate(type, destination.name)}
        ${createTimeTemplate(dateFrom, dateTo)}
        ${createPriceTemplate(basePrice)}
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
        ${showRollBtn}
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createOffersTemplate(offers.offers, type)}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${destination.pictures.map((currentPictureUrl) => `<img class="event__photo" src="${currentPictureUrl}" alt="Event photo">`).join('')}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};

class FormView extends SmartView {
  #formType = null;

  constructor(formType, pointData) {
    super();
    this.#formType = formType;
    this._data = FormView.parsePointToData(pointData);

    this.#setInnerListeners();
  }

  get template() {
    return createFormTemplate(this.#formType, this._data);
  }

  reset = (point) => {
    this.updateData(
      FormView.parsePointToData(point),
    );
  }

  setOnFormSubmit = (callback) => {
    this._callbacksStorage.formSubmit = callback;
    this.element.closest('form').addEventListener('submit', this.#onFormSubmit);
  }

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this._callbacksStorage.formSubmit();
  }

  setOnFormArrowClick = (callback) => {
    this._callbacksStorage.formArrowClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onFormArrowClick);
  }

  #onFormArrowClick = (evt) => {
    evt.preventDefault();
    this._callbacksStorage.formArrowClick();
  }

  static parsePointToData = (point) => (
    {...point});

  static parseDataToPoint = (data) => {
    const point = {...data};

    return point;
  }

  restoreListeners = () => {
    this.#setInnerListeners();
    this.setOnFormSubmit(this._callbacksStorage.formSubmit);
    this.setOnFormArrowClick(this._callbacksStorage.formArrowClick);
  }

  #setInnerListeners = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChange);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#onPriceInput);
    this.element.querySelector('.event__offer-selector').addEventListener('input', this.#onOffersChose);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onCityChange);
  }

  #onTypeChange = (evt) => {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      typeImg: `img/icons/${evt.target.value}.png`
    });
  }

  //данные меняются, но форма не перерисовывается (так и задумано)
  #onPriceInput = (evt) => {
    evt.preventDefault();
    this.updateData({
      basePrice: evt.target.value,
    }, true);
  }

  //данные меняются, но форма не перерисовывается (так и задумано)
  //как будто бы на будущее, но пока непонятно, нужно ли вот это вот все
  #onOffersChose = (evt) => {
    evt.preventDefault();
    let newOffer = {};
    if (evt.target.checked) {
      newOffer = {
        get id() {
          return OFFERS_BY_TYPE[this._data.type].findIndex((element) => element === this.tittle);
        },
        tittle: evt.target.name.slice(12),
        get offerPrice() {
          return PRICES[OFFERS_BY_TYPE[this._data.type].findIndex((element) => element === this.tittle)];
        },
      };
    }

    this.updateData({
      offers: {
        offers: [...this._data.offers.offers, newOffer]
      },
    }, true);
  };


  #onCityChange =(evt) => {
    evt.preventDefault();
    this.updateData({
      destination: {
        description: generateDestinationsText(),
        name: evt.target.value,
        pictures: createPictures(),
      }
    });
  };
}

export default FormView;
