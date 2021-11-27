import dayjs from 'dayjs';
import {POINT_TYPES, CITIES, OFFER_NAMES, PRICES} from './data-sources.js';
import {getRandomPositiveNumber, getRandomElement} from '../utils/random-gen.js';


//point-type
const pointType = getRandomElement(POINT_TYPES);

//cities
const city = getRandomElement(CITIES);

//offers
const createOffer = () => ({
  _name: getRandomElement(OFFER_NAMES),
  currency: '&plus;&euro;&nbsp',
  get price() {
    return PRICES[OFFER_NAMES.findIndex((element) => element === this._name)];
  },
});


const generateOffers = () => {
  const offersAmount = getRandomPositiveNumber(0, 5);
  const usedOffers = [];
  for (let i = 0; i < offersAmount; i++) {
    let currentObject = createOffer();
    let offer = `${currentObject._name} ${currentObject.currency} ${currentObject.price}`;
    while (usedOffers.join('').includes(currentObject._name)) { //слепляем массив в одну строку и ищем
      currentObject = createOffer();
      offer = `${currentObject._name} ${currentObject.currency} ${currentObject.price}`;
    }
    usedOffers.push(offer);
  }
  return usedOffers;
};

//date
const generateDate = () => {
  const dateDifference = getRandomPositiveNumber(1, 15);
  return dayjs().add(dateDifference, 'day').toDate();
};

//favorite
const isFavorite = Boolean(getRandomPositiveNumber(0, 1));

//price
const generatePrice = () => Math.ceil(getRandomPositiveNumber(2, 80))*10;

//time
