import {nanoid} from 'nanoid';
import {POINT_TYPES} from './constants.js';

const todayDate = new Date();

const defaultData = {
  basePrice: 300,
  dateFrom: todayDate.toISOString(),
  dateTo: todayDate.toISOString(),
  id: nanoid(),
  isFavorite: false,
  destination: {
    description: '',
    name: '',
    pictures: [],
  },
  offers: [],
  type: POINT_TYPES[5].toLowerCase(),
};

export {defaultData};
