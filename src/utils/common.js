import {formDayjsFromStr, getDurationInDayjs} from './time-and-date.js';

const sortItemsByDay = (pointA, pointB) => {
  const valueA = formDayjsFromStr(pointA.dateFrom, 'DD MM YY HH:mm');
  const valueB = formDayjsFromStr(pointB.dateFrom, 'DD MM YY HH:mm');
  return valueA - valueB;
};

const sortItemsByTime = (pointA, pointB) => {
  const endDayjsA = formDayjsFromStr(pointA.dateTo, 'DD MM YY HH:mm');
  const startDayjsA = formDayjsFromStr(pointA.dateFrom, 'DD MM YY HH:mm');
  const endDayjsB = formDayjsFromStr(pointB.dateTo, 'DD MM YY HH:mm');
  const startDayjsB = formDayjsFromStr(pointB.dateFrom, 'DD MM YY HH:mm');

  const valueA = getDurationInDayjs(endDayjsA, startDayjsA);
  const valueB = getDurationInDayjs(endDayjsB, startDayjsB);
  return valueB - valueA;
};

const sortItemsByPrice = (pointA, pointB) => {
  const valueA = pointA.basePrice;
  const valueB = pointB.basePrice;
  return valueB - valueA;
};

export {sortItemsByTime, sortItemsByPrice, sortItemsByDay};
