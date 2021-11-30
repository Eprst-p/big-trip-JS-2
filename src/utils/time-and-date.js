import dayjs from 'dayjs';
import {getRandomPositiveNumber} from './common.js';

const formDateValue = (someDate) => dayjs(someDate);

//генератор рандомного шага у даты
const generateRandomDate = (lastDate) => {
  const dateDifference = getRandomPositiveNumber(1, 4);
  return dayjs(lastDate).add(dateDifference, 'day');
};

//генератор рандомного стартового и конечного времени
const generateStartTime = (date) => {
  const randomStartHour = getRandomPositiveNumber(1, 8);
  return dayjs(date).add(randomStartHour, 'hour');
};

const generateEndTime = (startHour) => {
  //const randomDaysToAdd = getRandomPositiveNumber(0, 4); //пока еще с часами не разобрался до конца
  const randomHoursToAdd = getRandomPositiveNumber(0, 8);
  const randomMinutesToAdd = getRandomPositiveNumber(0, 3)*10;
  return dayjs(startHour).add(randomHoursToAdd, 'hour').add(randomMinutesToAdd, 'minute');
};

const getDateInFormat = (date, format) => formDateValue(date).format(format);

const getDuration = (endTime, startTime) => formDateValue(endTime - startTime).format('HH:mm');

export {formDateValue, generateRandomDate, generateStartTime, generateEndTime, getDateInFormat, getDuration};
