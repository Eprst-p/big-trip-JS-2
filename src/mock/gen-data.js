import {DESTINATIONS, POINT_TYPES, CITIES, OFFER_NAMES, PRICES} from './data-sources.js';
import {getRandomPositiveNumber, getRandomElement} from '../utils/common.js';
import {formDateValue, generateRandomDate, generateStartTime, generateEndTime} from '../utils/time-and-date.js';


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
      while (element._name === currentObject._name) { //кривая проверка, но вроде пока это не принципиально
        currentObject = createOffer();
      }
    });
    usedOffers.push(currentObject);
  }
  return usedOffers;
};

//price
const generatePrice = () => Math.ceil(getRandomPositiveNumber(2, 80))*10;

//destionations
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


//сам объект point
let newDate = formDateValue();

const generatePoint = () => {
  const nextDate = generateRandomDate(newDate);
  const startTime = generateStartTime(nextDate);
  const endTime = generateEndTime(startTime);
  const duration = endTime - startTime; //почему то берутся откуда то лишние 3 часа
  //const duration = endTime.diff(startTime); //в таком формате аналогично
  newDate = endTime;
  return {
    date: nextDate,
    _type: getRandomElement(POINT_TYPES),
    get typeImg() {
      return `img/icons/${this._type.toLowerCase()}.png`;
    },
    city: getRandomElement(CITIES),
    time: {
      startTime: formDateValue(startTime),
      endTime: formDateValue(endTime),
      durationTime: formDateValue(duration)
    },
    price: generatePrice(),
    offers: generateOffers(),
    favorite: Boolean(getRandomPositiveNumber(0, 1)),
    destination: generateDestinationsText(),
    pictures: createPictures(),
  };
};

export {generatePoint};
