import {FilterType}  from './constants.js';
import {getDateInDayjs} from './time-and-date.js';

const getUnidentifiedByTimePoint = (point) => getDateInDayjs(point.dateFrom) < getDateInDayjs() && getDateInDayjs(point.dateTo) > getDateInDayjs();

const filterFunctional = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => getDateInDayjs(point.dateFrom) >= getDateInDayjs() || getUnidentifiedByTimePoint(point)),
  [FilterType.PAST]: (points) => points.filter((point) => getDateInDayjs(point.dateTo) < getDateInDayjs() || getUnidentifiedByTimePoint(point)),
};

export {filterFunctional};
