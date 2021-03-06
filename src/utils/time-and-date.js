import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const getDateInDayjs = (date) => dayjs(date);

const getDateInFormat = (date, format) => dayjs(date).format(format);

const zeroDuration = dayjs.duration(0);

const getDuration = (endTime, startTime) => dayjs.duration(endTime.diff(startTime));

const getDurationFormat = (endTime, startTime, someDuration) => {
  const currentDuration = someDuration || getDuration(endTime, startTime);

  const days = Math.floor(currentDuration.asDays());
  const hours = currentDuration.hours();
  const minutes = currentDuration.minutes();

  if (minutes <= 59 && hours === 0 && days === 0) {
    return `${currentDuration.format('mm')}M`;
  }
  if (hours > 0 && days === 0) {
    return `${currentDuration.format('HH')}H ${currentDuration.format('mm')}M`;
  }
  if (days >= 1 && days < 10) {
    return `${currentDuration.format('DD')}D ${currentDuration.format('HH')}H ${currentDuration.format('mm')}M`;
  }
  if (days >= 10) {
    return `${days}D ${currentDuration.format('HH')}H ${currentDuration.format('mm')}M`;
  }

};

export {getDateInFormat, getDuration, getDurationFormat, zeroDuration, getDateInDayjs};
