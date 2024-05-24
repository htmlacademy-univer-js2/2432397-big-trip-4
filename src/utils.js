import dayjs from 'dayjs';
import {FilterType} from './const';

function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function getRandomUUID(){
  return crypto.randomUUID();
}

function getTimeInDays(startTime, endTime) {
  const days = dayjs(endTime).diff(dayjs(startTime), 'days');
  return days === 0 ? '' : `${days}D`;
}
function getTimeInHours(startTime, endTime) {
  const hours = dayjs(endTime).diff(dayjs(startTime), 'hours') % 24;
  return hours === 0 ? '' : `${hours}H`;
}

function getTimeInMinutes(startTime, endTime) {
  const minutes = dayjs(endTime).diff(dayjs(startTime), 'minutes') % 60;
  return minutes === 0 ? '' : `${minutes}M`;
}

function sortPointDay(points) {
  return points.sort((firstPoint, secondPoint) => new Date(firstPoint.dateFrom) - new Date(secondPoint.dateFrom));
}

function sortPointTime(points) {
  return points.sort((firstPoint, secondPoint) =>
    dayjs(firstPoint.dateFrom).diff(dayjs(firstPoint.dateTo), 'minutes') -
    dayjs(secondPoint.dateFrom).diff(dayjs(secondPoint.dateTo), 'minutes'));
}

function sortPointPrice(points) {
  return points.sort((firstPoint, secondPoint) => secondPoint.basePrice - firstPoint.basePrice);
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

function isFuture(dateFrom) {
  const formattedDate = dayjs(dateFrom).format('YYYY/MM/DD');
  const currentDate = dayjs().format('YYYY/MM/DD');
  return dayjs(formattedDate).isAfter(currentDate);
}

function isPresent(dateFrom) {
  const formattedDate = dayjs(dateFrom).format('YYYY/MM/DD');
  const currentDate = dayjs().format('YYYY/MM/DD');
  return dayjs(formattedDate).isSame(currentDate);
}

function isPast(dateFrom) {
  const formattedDate = dayjs(dateFrom).format('YYYY/MM/DD');
  const currentDate = dayjs().format('YYYY/MM/DD');
  return dayjs(formattedDate).isBefore(currentDate);
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPresent(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isPast(point.dateFrom)),
};

export {
  getRandomArrayElement,
  getRandomUUID,
  getTimeInDays,
  getTimeInHours,
  getTimeInMinutes,
  sortPointTime,
  sortPointPrice,
  sortPointDay,
  isDatesEqual,
  filter,
};
