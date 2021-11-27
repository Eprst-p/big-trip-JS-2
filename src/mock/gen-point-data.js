import {getRandomPositiveNumber} from '../utils/random-gen.js';

const DESTINATIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const CITIES = ['Amsterdam', 'Chamonix','Geneva','New-York','Berlin','London','Paris','Moscow','City-17'];

const OFFER_NAMES = ['Add luggage', 'Switch to comfort class', 'Add meal', 'Choose seats', 'Travel by train'];

const PRICES = ['30', '100', '15', '5', '40']; //четко соответсвует по порядку именам офферов

const getRandomElement = (array) => array[getRandomPositiveNumber(0, array.length-1)];

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

//point-type
const pointType = getRandomElement(POINT_TYPES);

//cities
const city = getRandomElement(CITIES);

//offers - пока непонятно что здесь

const createOffer = () => ({ //походу не работает такое создание объекта
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
const gen = generateOffers();
console.log(generateOffers());

