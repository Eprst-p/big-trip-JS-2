import {formDayjsFromStr, getDateInFormat} from './time-and-date.js';
import {nanoid} from 'nanoid';
import {POINT_TYPES} from './constants.js';

const defaultData = {
  basePrice:'300$',
  dateFrom: getDateInFormat(formDayjsFromStr(), 'DD MM YY HH:mm'),
  dateTo: getDateInFormat(formDayjsFromStr(), 'DD MM YY HH:mm'),
  id: nanoid(),
  isFavorite: 0,
  destination: {
    description: 'In the name of the Empero',
    name: '',
    pictures: [],
  },
  offers: {
    type: POINT_TYPES[5].toLowerCase(),
    offers: [],
  },
  type: POINT_TYPES[5].toLowerCase(),
  typeImg: `img/icons/${POINT_TYPES[5].toLowerCase()}.png`,
};

export {defaultData};
