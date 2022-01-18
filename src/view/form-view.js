import {POINT_TYPES, FORM_TYPES} from '../utils/constants.js';
import {getDateInFormat} from '../utils/time-and-date.js';
import SmartView from './smart-view.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createTypeAndCityTextTemplate = (type, city, allCities, isDisabled) => (
  `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input
      class="event__input  event__input--destination"
      id="event-destination-1"
      type="text"
      name="event-destination"
      value="${city}"
      list="destination-list-1"
      ${isDisabled ? 'disabled' : ''}
    >
    <datalist id="destination-list-1">
    ${allCities.map((currentCity) => `
      <option value="${currentCity}"></option>`).join('')}
    </datalist>
  </div>`
);

const createTimeTemplate = (startTime, endTime, isDisabled) => {

  const editedStartTime = getDateInFormat(startTime, 'DD MM YY HH:mm');
  const editedEndTime = getDateInFormat(endTime, 'DD MM YY HH:mm');
  const smallerFontSize = 'style = font-size:90%';

  return (
    `<div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input
        class="event__input  event__input--time"
        id="event-start-time-1"
        type="text"
        name="event-start-time"
        value="${editedStartTime}"
        ${smallerFontSize}
        ${isDisabled ? 'disabled' : ''}
      >
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input
        class="event__input  event__input--time"
        id="event-end-time-1"
        type="text"
        name="event-end-time"
        value="${editedEndTime}"
        ${smallerFontSize}
        ${isDisabled ? 'disabled' : ''}
      >
    </div>`
  );
};


const createPriceTemplate = (price, isDisabled) => (
  `<div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input
      class="event__input  event__input--price"
      id="event-price-1"
      type="text"
      name="event-price"
      value="${price}"
      ${isDisabled ? 'disabled' : ''}
    >
  </div>`
);

const createOffersTemplate = (offers, pointType, allPossisbleOffers, isDisabled) => {
  const offerByType = allPossisbleOffers.find((element) => element.type === pointType);

  const names = offerByType.offers;

  const checkChosenOffer = (offerId) => {
    let check = '';
    offers.forEach((currentOffer) => {
      if (currentOffer.id === offerId) {
        check = 'checked';
      }
    });
    return check;
  };

  return (
    names.map((offer) => `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${offer.title}-1"
        type="checkbox"
        name="event-offer-${offer.title}"
        ${checkChosenOffer(offer.id)}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="event__offer-label" for="event-offer-${offer.title}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`).join('')
  );
};

//основной темплейт
const createFormTemplate = (formType, pointData, allPossisbleOffers, allCities) => {

  const {type, dateFrom, dateTo, basePrice, offers, destination, isDisabled, isSaving, isDeleting} = pointData;

  const typeImg = `img/icons/${type.toLowerCase()}.png`;

  const DeleteBtnText = isDeleting ? 'Deleting...' : 'Delete';

  return (
    `<form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="${typeImg}" alt="Event type icon">
          </label>
          <input
            class="event__type-toggle  visually-hidden"
            id="event-type-toggle-1"
            type="checkbox"
            ${isDisabled ? 'disabled' : ''}
           >

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
        ${createTypeAndCityTextTemplate(type, destination.name, allCities, isDisabled)}
        ${createTimeTemplate(dateFrom, dateTo, isDisabled)}
        ${createPriceTemplate(basePrice, isDisabled)}
        <button
          class="event__save-btn  btn  btn--blue"
          type="submit"
          ${isDisabled ? 'disabled' : ''}
        >
        ${isSaving ? 'Saving...' : 'Save'}
        </button>
        <button
          class="event__reset-btn"
          type="reset"
          ${isDisabled ? 'disabled' : ''}
        >
        ${(formType === FORM_TYPES.EDIT_FORM) ?  DeleteBtnText : 'Cancel'}
        </button>
        ${(formType === FORM_TYPES.EDIT_FORM) ?
      `<button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
          <span class="visually-hidden">Open event</span>
        </button>` : ''}
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createOffersTemplate(offers, type, allPossisbleOffers, isDisabled)}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${destination.pictures.map((currentPicture) => `<img class="event__photo" src="${currentPicture.src}" alt="${currentPicture.description}">`).join('')}
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
  #allPossisbleOffers = null;
  #allDestinations = null;
  #allCities = null;

  constructor(formType, pointData, allPossisbleOffers, allDestinations) {
    super();
    this.#formType = formType;
    this.#allPossisbleOffers = allPossisbleOffers;
    this.#allDestinations = allDestinations;
    this.#allCities = this.#allDestinations.map((element) => element.name);
    this._data = FormView.parsePointToData(pointData);

    this.#setInnerListeners();
  }

  get template() {
    return createFormTemplate(this.#formType, this._data, this.#allPossisbleOffers, this.#allCities);
  }

  //установка обработчиков
  setOnFormSubmit = (callback) => {
    this._callbacksStorage.formSubmit = callback;
    this.element.closest('form').addEventListener('submit', this.#onFormSubmit);
  }

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this.#updateOffers();

    if (!this.#checkDateDifference()) {
      return;
    }

    if (!this.#checkCity()) {
      return;
    }

    this._callbacksStorage.formSubmit(FormView.parseDataToPoint(this._data));
  }

  setOnFormArrowClick = (callback) => {
    if (this.#formType === FORM_TYPES.EDIT_FORM) {
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
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onPriceChange);
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
    {...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });

  static parseDataToPoint = (data) => {
    const point = {...data};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

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

  #onPriceChange = (evt) => {
    evt.preventDefault();
    const priceInput = this.element.querySelector('.event__input--price');
    const price = +evt.target.value;

    if (!Number.isInteger(price)) {
      priceInput.setCustomValidity('Введите положительное число');
      priceInput.reportValidity();
    } else {
      priceInput.setCustomValidity('');
      priceInput.reportValidity();
      this.updateData({
        basePrice: +evt.target.value,
      }, true);
    }
  }

  #onCityChange =(evt) => {
    evt.preventDefault();
    const chosenCity = evt.target.value;
    const cityInput = this.element.querySelector('.event__input--destination');
    const chosenCityDestination = this.#allDestinations.find((element) => element.name === chosenCity);

    if (!this.#allCities.includes(chosenCity)) {
      cityInput.setCustomValidity('Выберите город из представленных');
      cityInput.reportValidity();
    } else {
      cityInput.setCustomValidity('');
      cityInput.reportValidity();

      this.updateData({
        destination: {
          description: chosenCityDestination.description,
          name: chosenCity,
          pictures: chosenCityDestination.pictures,
        }
      });
    }
  }

  #updateOffers = () => {
    const offerRadioDivs = this.element.querySelectorAll('.event__offer-selector');
    const newOffers = [];
    offerRadioDivs.forEach((offerDiv, index) => {
      const offerInput = offerDiv.querySelector('.event__offer-checkbox');
      const spanTitle = offerDiv.querySelector('.event__offer-title');
      const spanPrice = offerDiv.querySelector('.event__offer-price');

      if (offerInput.checked) {
        const newOffer = {
          id: index + 1,
          title: spanTitle.textContent,
          price: +spanPrice.textContent
        };
        newOffers.push(newOffer);
      }
    });
    this._data.offers = newOffers;
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
        time_24hr: true,// eslint-disable-line camelcase
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._data.dateFrom,
        onClose: this.#onDateStartChange,
      },
    );
    this.#datepickerEnd = flatpickr(
      endTime,
      {
        enableTime: true,
        time_24hr: true,// eslint-disable-line camelcase
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._data.dateTo,
        onClose: this.#onDateEndChange,
      },
    );
  }

  #checkDateDifference = () => {
    const startDate = new Date(this._data.dateFrom);
    const endDate = new Date(this._data.dateTo);
    const dateDifference = endDate - startDate;

    const saveBtn = this.element.querySelector('.event__save-btn');

    if (dateDifference < 0) {
      saveBtn.setCustomValidity('Время начала поездки позже времени окончания');
      saveBtn.reportValidity();
      return false;
    } else {
      saveBtn.setCustomValidity('');
      saveBtn.reportValidity();
      return true;
    }
  }

  #checkCity = () => {
    const cityInput = this.element.querySelector('.event__input--destination');

    if (cityInput.value === '') {
      cityInput.setCustomValidity('Выберите город из представленных');
      cityInput.reportValidity();
      return false;
    } else {
      cityInput.setCustomValidity('');
      cityInput.reportValidity();
      return true;
    }
  }
}

export default FormView;
