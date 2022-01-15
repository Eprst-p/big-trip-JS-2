import {FilterType}  from './constants.js';
import {getDateInDayjs} from './time-and-date.js';

const filterFunctional = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => getDateInDayjs(point.dateFrom) > getDateInDayjs()),
  [FilterType.PAST]: (points) => points.filter((point) => getDateInDayjs(point.dateFrom) < getDateInDayjs()),
};

export {filterFunctional};
