import {FilterType}  from './constants.js';
import {testDate}  from './time-and-date.js';

const filterFunctional = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => point.dateFrom > testDate),
  [FilterType.PAST]: (points) => points.filter((point) => point.dateFrom < testDate),
};

export {filterFunctional};
