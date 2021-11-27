import dayjs from 'dayjs';
import {POINT_TYPES, CITIES, OFFER_NAMES, PRICES} from './data-sources.js';
import {getRandomPositiveNumber, getRandomElement} from '../utils/random-gen.js';

//offers
const createOffer = () => ({
  _name: getRandomElement(OFFER_NAMES),
  currency: '&plus;&euro;&nbsp',
  get offerPrice() {
    return PRICES[OFFER_NAMES.findIndex((element) => element === this._name)];
  },
});


const generateOffers = () => {
  const offersAmount = getRandomPositiveNumber(0, 5);
  const usedOffers = [];
  for (let i = 0; i < offersAmount; i++) {
    let currentObject = createOffer();
    usedOffers.forEach((element) => {
      while (element._name === currentObject._name) { //кривая проверка
        currentObject = createOffer();
      }
    });
    usedOffers.push(currentObject);
  }
  return usedOffers;
};

//date
const generateDate = () => {
  const dateDifference = getRandomPositiveNumber(1, 15);
  return dayjs().add(dateDifference, 'day').toDate();
};

//price
const generatePrice = () =>Math.ceil(getRandomPositiveNumber(2, 80))*10;

//time

//а вот и сам объект point
const generatePoint = () => ({
  date: generateDate(),
  _type: getRandomElement(POINT_TYPES),
  get typeImg() {
    return `img/icons/${this._type.toLowerCase()}.png`;
  },
  city: getRandomElement(CITIES),
  time: '#',
  price: generatePrice(),
  offers: generateOffers(),
  favorite: Boolean(getRandomPositiveNumber(0, 1))
});

export {generatePoint};
