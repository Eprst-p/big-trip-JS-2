import {FilterType}  from './constants.js';
import {testDate}  from './time-and-date.js';
import {formDayjsFromStr} from './time-and-date.js';

const filterFunctional = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => formDayjsFromStr(point.dateFrom, 'DD MM YY HH:mm') > testDate),
  [FilterType.PAST]: (points) => points.filter((point) => formDayjsFromStr(point.dateFrom, 'DD MM YY HH:mm') < testDate),
};

export {filterFunctional};
