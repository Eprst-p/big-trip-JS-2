import {DESTINATIONS, CITIES,} from './data-sources.js';
import {POINT_TYPES, PRICES, OFFERS_BY_TYPE} from '../utils/constants.js';
import {nanoid} from 'nanoid';
import {getRandomPositiveNumber, getRandomElement} from '../utils/common.js';
import {formDayjsFromStr, generateRandomDate, generateStartTime, generateEndTime, getDateInFormat} from '../utils/time-and-date.js';

//offers
const createOfferItem = (pointType) => ({
  get id() {
    return OFFERS_BY_TYPE[pointType].findIndex((element) => element === this.title);
  },
  title: getRandomElement(OFFERS_BY_TYPE[pointType]),
  get offerPrice() {
    return PRICES[OFFERS_BY_TYPE[pointType].findIndex((element) => element === this.title)];
  },
});

const generateOffers = (pointType) => {
  const offersAmount = getRandomPositiveNumber(0, OFFERS_BY_TYPE[pointType].length);
  const usedOffers = [];
  for (let i = 0; i < offersAmount; i++) {
    let currentObject = createOfferItem(pointType);
    usedOffers.forEach((element) => {
      while (element.title === currentObject.title) { //кривая проверка, но вроде пока это не принципиально
        currentObject = createOfferItem(pointType);
      }
    });
    usedOffers.push(currentObject);
  }
  return usedOffers;
};

const createResultOffer = (pointType) => ({
  type: pointType,
  offers: generateOffers(pointType)
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
let newDate = formDayjsFromStr();

const generatePoint = () => {
  const nextDate = generateRandomDate(newDate);
  const startTime = generateStartTime(nextDate);
  const endTime = generateEndTime(startTime);
  newDate = endTime;
  const pointType = getRandomElement(POINT_TYPES).toLowerCase();
  return {
    basePrice: generatePrice(),
    dateFrom: getDateInFormat(startTime, 'DD MM YY HH:mm'),
    dateTo: getDateInFormat(endTime, 'DD MM YY HH:mm'),
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

export {generatePoint, generateDestinationsText, createPictures};
