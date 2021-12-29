import dayjs from 'dayjs';
import {getRandomPositiveNumber} from './common.js';

const customParseFormat = require('dayjs/plugin/customParseFormat');// eslint-disable-line no-undef
dayjs.extend(customParseFormat);

const formDayjsFromStr = (someDate, string) => dayjs(someDate, string);
const testDate = dayjs('2022-01-10', 'YYYY-MM-DD');//тестовая дата - так как от текущей будут ненаглядные фильтры

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

const getDateInFormat = (date, format) => dayjs(date).format(format);

const getDuration = (endTime, startTime) => dayjs(endTime - startTime);

export {formDayjsFromStr, generateRandomDate, generateStartTime, generateEndTime, getDateInFormat, getDuration, testDate};
