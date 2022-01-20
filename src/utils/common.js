import {getDateInDayjs} from './time-and-date.js';

const sortItemsByDay = (pointA, pointB) => {
  const valueA = getDateInDayjs(pointA.dateFrom);
  const valueB = getDateInDayjs(pointB.dateFrom);
  return valueA - valueB;
};

const sortItemsByTime = (pointA, pointB) => {

  const endDayjsA = getDateInDayjs(pointA.dateTo);
  const startDayjsA = getDateInDayjs(pointA.dateFrom);
  const endDayjsB = getDateInDayjs(pointB.dateTo);
  const startDayjsB = getDateInDayjs(pointB.dateFrom);

  const valueA = endDayjsA - startDayjsA;
  const valueB = endDayjsB - startDayjsB;

  return valueB - valueA;
};

const sortItemsByPrice = (pointA, pointB) => {
  const valueA = pointA.basePrice;
  const valueB = pointB.basePrice;
  return valueB - valueA;
};

export {sortItemsByTime, sortItemsByPrice, sortItemsByDay};
