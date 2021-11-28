import {DESTINATIONS} from './data-sources.js';
import {getRandomPositiveNumber, getRandomElement} from '../utils/random-gen.js';


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
    picturesAmount.push(currentPictureUrl);
  }
  return pictureUrls;
};

//сам объект формы
const generateForm = () => {
  const smthg = '';
  return {
    _type: '#',
    get typeImg() {
      return `img/icons/${this._type.toLowerCase()}.png`;
    },
    city: '#',
    time: {
      startTime: '#',
      endTime: '#',
    },
    price: '#',
    offers:'#',
    destination: generateDestinationsText(),
    pictures: createPictures(),
  };
};