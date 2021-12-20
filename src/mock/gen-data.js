import {DESTINATIONS, CITIES,} from './data-sources.js';
import {POINT_TYPES, OFFER_NAMES, PRICES} from '../utils/constants.js';
import {nanoid} from 'nanoid';
import {getRandomPositiveNumber, getRandomElement} from '../utils/common.js';
import {formDateValue, generateRandomDate, generateStartTime, generateEndTime} from '../utils/time-and-date.js';

//offers
const createOfferItem = () => ({
  get id() {
    return OFFER_NAMES.findIndex((element) => element === this.tittle);
  },
  tittle: getRandomElement(OFFER_NAMES),
  get offerPrice() {
    return PRICES[OFFER_NAMES.findIndex((element) => element === this.tittle)];
  },
});

const generateOffers = () => {
  const offersAmount = getRandomPositiveNumber(0, 5);
  const usedOffers = [];
  for (let i = 0; i < offersAmount; i++) {
    let currentObject = createOfferItem();
    usedOffers.forEach((element) => {
      while (element.tittle === currentObject.tittle) { //кривая проверка, но вроде пока это не принципиально
        currentObject = createOfferItem();
      }
    });
    usedOffers.push(currentObject);
  }
  return usedOffers;
};

const createResultOffer = (pointType) => ({
  type: pointType,
  offers: generateOffers()
});

//price
const generatePrice = () => Math.ceil(getRandomPositiveNumber(2, 80))*10;

//destionation text
const findDestinationSentence = (usedDestinations) => {
  let sentence = getRandomElement(DESTINATIONS);
  while (usedDestinations.includes(sentence)) { //проверка на уникальность
    sentence = getRandomElement(DESTINATIONS);
  }
  usedDestinations.push(sentence);
  return sentence;
};

const generateDestinationsText = () => {
  const sentencesAmount = getRandomPositiveNumber(1, 5);
  const usedDestinations = [];
  let destinationText = '';
  for (let i = 0; i < sentencesAmount; i++) {
    destinationText += `${findDestinationSentence(usedDestinations)} `;
  }
  return destinationText;
};

//pictures
const createPictures = () => {
  const picturesAmount = getRandomPositiveNumber(1, 7);
  const pictureUrls = [];
  for (let i = 0; i < picturesAmount; i++) {
    const currentPictureUrl = `http://picsum.photos/248/152?r=${Math.random()}`;
    pictureUrls.push(currentPictureUrl);
  }
  return pictureUrls;
};

//объект destination
const createDestination = () => ({
  description: generateDestinationsText(),
  name: getRandomElement(CITIES),
  pictures: createPictures(),
});

//сам объект point
let newDate = formDateValue();

const generatePoint = () => {
  const nextDate = generateRandomDate(newDate);
  const startTime = generateStartTime(nextDate);
  const endTime = generateEndTime(startTime);
  newDate = endTime;
  const pointType = getRandomElement(POINT_TYPES);
  return {
    basePrice: generatePrice(),
    dateFrom: startTime,
    dateTo: endTime,
    id: nanoid(),
    isFavorite: Boolean(getRandomPositiveNumber(0, 1)),
    offers: createResultOffer(pointType),
    type: pointType,
    get typeImg() {
      return `img/icons/${this.type.toLowerCase()}.png`;
    },
    destination: createDestination()
  };
};

export {generatePoint};
