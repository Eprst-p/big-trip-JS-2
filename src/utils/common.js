import {formDayjsFromStr, getDuration} from './time-and-date.js';

const getRandomPositiveNumber = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower; //рандомное число от a до b включительно
};

const getRandomElement = (array) => array[getRandomPositiveNumber(0, array.length-1)];

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

  const valueA = getDuration(endDayjsA, startDayjsA);
  const valueB = getDuration(endDayjsB, startDayjsB);
  return valueB - valueA;
};

const sortItemsByPrice = (pointA, pointB) => {
  const valueA = pointA.basePrice;
  const valueB = pointB.basePrice;
  return valueB - valueA;
};

export {getRandomPositiveNumber, getRandomElement, sortItemsByTime, sortItemsByPrice, sortItemsByDay};
