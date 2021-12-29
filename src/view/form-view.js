/* eslint-disable camelcase */
/* eslint-disable indent */
import {PRICES, POINT_TYPES, OFFERS_BY_TYPE} from '../utils/constants.js';
import {formDayjsFromStr, getDateInFormat} from '../utils/time-and-date.js';
import SmartView from './smart-view.js';
import {CITIES} from '../mock/data-sources.js';
import {generateDestinationsText, createPictures} from '../mock/gen-data.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

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
  const smallerFontSize = 'style = font-size:90%';

  return (
    `<div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${editedStartTime}" ${smallerFontSize}>
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${editedEndTime}" ${smallerFontSize}>
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
      if (currentOffer.title === OFFERS_BY_TYPE[pointType][index]) {
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
    dateFrom = formDayjsFromStr(),
    dateTo = formDayjsFromStr(),
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
        <button class="event__reset-btn" type="reset">${(formType === 'editForm') ? 'Delete' : 'Cancel'}</button>
        ${(formType === 'editForm') ?
       `<button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>` : ''}
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
  #datepickerStart = null;
  #datepickerEnd = null;


  constructor(formType, pointData) {
    super();
    this.#formType = formType;
    this._data = FormView.parsePointToData(pointData);

    this.#setInnerListeners();
  }

  get template() {
    return createFormTemplate(this.#formType, this._data);
  }

  //установка обработчиков
  setOnFormSubmit = (callback) => {
    this._callbacksStorage.formSubmit = callback;
    this.element.closest('form').addEventListener('submit', this.#onFormSubmit);
  }

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this.#updateOffers();
    this._callbacksStorage.formSubmit(FormView.parseDataToPoint(this._data));
  }

  setOnFormArrowClick = (callback) => {
    if (this.#formType === 'editForm') {
      this._callbacksStorage.formArrowClick = callback;
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onFormArrowClick);
    }
  }

  #onFormArrowClick = (evt) => {
    evt.preventDefault();
    this._callbacksStorage.formArrowClick();
  }

  setOnDeleteBtnClick = (callback) => {
    this._callbacksStorage.deleteBtnClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onDeleteBtnClick);
  }

  #onDeleteBtnClick = (evt) => {
    evt.preventDefault();
    this._callbacksStorage.deleteBtnClick(FormView.parseDataToPoint(this._data));
  }

  setOnCancelBtnClick = (callback) => {
    this._callbacksStorage.cancelBtnClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onCancelBtnClick);
  }

  #onCancelBtnClick = (evt) => {
    evt.preventDefault();
    this._callbacksStorage.cancelBtnClick();
  }

  #setInnerListeners = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChange);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#onPriceInput);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onCityChange);
  }

  restoreListeners = () => {
    this.#setInnerListeners();
    this.setOnFormSubmit(this._callbacksStorage.formSubmit);
    this.setOnFormArrowClick(this._callbacksStorage.formArrowClick);
    this.setOnDeleteBtnClick(this._callbacksStorage.deleteBtnClick);
    this.setDatepicker();
  }

  //изменение данных
  static parsePointToData = (point) => (
    {...point});

  static parseDataToPoint = (data) => {
    const point = {...data};

    return point;
  }

  reset = (point) => {
    this.updateData(
      FormView.parsePointToData(point),
    );
  }

  #onDateStartChange = ([userDate]) => {
    this.updateData({
      dateFrom: userDate,
    });
  }

  #onDateEndChange = ([userDate]) => {
    this.updateData({
      dateTo: userDate,
    });
  }

  #onTypeChange = (evt) => {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      typeImg: `img/icons/${evt.target.value}.png`
    });
  }

  #onPriceInput = (evt) => {//данные меняются, но форма не перерисовывается (так и задумано)
    evt.preventDefault();
    const priceInput = this.element.querySelector('.event__input--price');
    const price = +evt.target.value;

    if (!Number.isInteger(price)) {
      priceInput.setCustomValidity('Введите положительное число');
      priceInput.reportValidity();
    }
    else {
      priceInput.setCustomValidity('');
      priceInput.reportValidity();
      this.updateData({
        basePrice: evt.target.value,
      }, true);
    }
  }

  #onCityChange =(evt) => {
    evt.preventDefault();
    const cityInput = this.element.querySelector('.event__input--destination');
    const chosenCity = evt.target.value;

    if (!CITIES.includes(chosenCity)) {
      cityInput.setCustomValidity('Выберите город из представленных');
      cityInput.reportValidity();
    }
    else {
      cityInput.setCustomValidity('');
      cityInput.reportValidity();
      this.updateData({
        destination: {
          description: generateDestinationsText(),
          name: evt.target.value,
          pictures: createPictures(),
        }
      });
    }
  }

  #updateOffers = () => {
    const offerRadioDivs = this.element.querySelectorAll('.event__offer-selector');
    const newOffers = [];
    offerRadioDivs.forEach((offerDiv) => {
      const offerInput = offerDiv.querySelector('.event__offer-checkbox');
      const spanTitle = offerDiv.querySelector('.event__offer-title');
      const spanPrice = offerDiv.querySelector('.event__offer-price');

      if (offerInput.checked) {
        const newOffer = {
          id: offerInput.id,
          title: spanTitle.textContent,
          offerPrice: spanPrice.textContent
        };
        newOffers.push(newOffer);
      }
    });
    this._data.offers.offers = newOffers;
  }

  //другие методы
  removeElement = () => {
    super.removeElement();

    if (this.#datepickerStart && this.#datepickerEnd) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;

    }
  }

  setDatepicker = () => {
    const startTime = this.element.querySelector('#event-start-time-1');
    const endTime = this.element.querySelector('#event-end-time-1');

    this.#datepickerStart = flatpickr(
      startTime,
      {
        enableTime: true,
        time_24hr: true,
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._data.dateFrom,
        onClose: this.#onDateStartChange,
      },
    );
    this.#datepickerEnd = flatpickr(
      endTime,
      {
        enableTime: true,
        time_24hr: true,
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._data.dateTo,
        onClose: this.#onDateEndChange,
      },
    );
  }
}

export default FormView;
