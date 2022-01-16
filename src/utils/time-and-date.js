import dayjs from 'dayjs';
import {getRandomPositiveNumber} from './common.js';

const customParseFormat = require('dayjs/plugin/customParseFormat');// eslint-disable-line no-undef
dayjs.extend(customParseFormat);

const duration = require('dayjs/plugin/duration');// eslint-disable-line no-undef
dayjs.extend(duration);

const formDayjsFromStr = (someDate, string) => dayjs(someDate, string);

const getDateInDayjs = (date) => dayjs(date);

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
  const randomDaysToAdd = getRandomPositiveNumber(0, 4);
  const randomHoursToAdd = getRandomPositiveNumber(0, 8);
  const randomMinutesToAdd = getRandomPositiveNumber(0, 3)*10;
  return dayjs(startHour).add(randomDaysToAdd, 'day').add(randomHoursToAdd, 'hour').add(randomMinutesToAdd, 'minute');
};

const getDateInFormat = (date, format) => dayjs(date).format(format);

const getDurationInDayjs = (endTime, startTime) => dayjs(endTime - startTime);//для сортировки только

const zeroDuration = dayjs.duration(0);

const getDuration = (endTime, startTime) => dayjs.duration(endTime.diff(startTime));

const getDurationFormat = (endTime, startTime, someDuration) => {
  const currentDuration = someDuration || getDuration(endTime, startTime);

  const days = currentDuration.days();
  const hours = currentDuration.hours();
  const minutes = currentDuration.minutes();

  if (minutes <= 59 && hours === 0 && days === 0) {
    return `${currentDuration.format('mm')}M`;
  }
  if (hours > 0 && days === 0) {
    return `${currentDuration.format('HH')}H ${currentDuration.format('mm')}M`;
  }
  if (days >= 1) {
    return `${currentDuration.format('DD')}D ${currentDuration.format('HH')}H ${currentDuration.format('mm')}M`;
  }
};

export {formDayjsFromStr, generateRandomDate, generateStartTime, generateEndTime, getDateInFormat, getDuration, getDurationInDayjs, getDurationFormat, zeroDuration, getDateInDayjs};
