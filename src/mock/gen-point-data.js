import dayjs from 'dayjs';
import {POINT_TYPES, CITIES, OFFER_NAMES, PRICES} from './data-sources.js';
import {getRandomPositiveNumber, getRandomElement} from '../utils/random-gen.js';
import {generateDestinationsText, createPictures} from './gen-form-data.js';


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

//date
const generateDate = (lastDate) => {
  const dateDifference = getRandomPositiveNumber(1, 4);
  return dayjs(lastDate).add(dateDifference, 'day');
};

//price
const generatePrice = () => Math.ceil(getRandomPositiveNumber(2, 80))*10;

//time
const generateStartTime = (date) => {
  const randomStartHour = getRandomPositiveNumber(1, 8);
  return dayjs(date).add(randomStartHour, 'hour');
};

const generateEndTime = (startHour) => {
  //const randomDaysToAdd = getRandomPositiveNumber(0, 4); //пока еще с часами не разобрался до конца
  const randomHoursToAdd = getRandomPositiveNumber(0, 8);
  const randomMinutesToAdd = getRandomPositiveNumber(0, 3)*10;
  return dayjs(startHour).add(randomHoursToAdd, 'hour').add(randomMinutesToAdd, 'minute');
};

//сам объект point
let newDate = dayjs();

const generatePoint = () => {
  const nextDate = generateDate(newDate);
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
      startTime: dayjs(startTime),
      endTime: dayjs(endTime),
      durationTime: dayjs(duration)
    },
    price: generatePrice(),
    offers: generateOffers(),
    favorite: Boolean(getRandomPositiveNumber(0, 1)),
    destination: generateDestinationsText(),
    pictures: createPictures(),
  };
};

export {generatePoint};
