import dayjs from 'dayjs';
import {FilterType} from './const';

const TYPE_POINTS = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant'
};

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
  return points.sort((firstPoint, secondPoint) => secondPoint.price - firstPoint.price);
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

function updatePoints(points, update) {
  return points.map((point) => point.id === update.id ? update : point);
}
function getDefaultPoint() {
  const defaultType = TYPE_POINTS.FLIGHT;
  return{
    //id: crypto.randomUUID(),
    price: 0,
    dateFrom: new Date(dayjs().format('')),
    dateTo: new Date(dayjs().format('')),
    destination: '',
    isFavorite: false,
    offers: [],
    type: defaultType
  };
}


function getTripInfoTitle(cities) {
  if (cities.length > 3) {
    return `${cities[0]} &mdash; ... &mdash; ${cities[cities.length - 1]}`;
  } else {
    return cities.reduce((acc, city, index) => {
      if (index !== cities.length - 1) {
        acc += `${city} &mdash; `;
      } else {
        acc += `${city}`;
      }
      return acc;
    }, '');
  }
}

function getTripInfoStartDate(sortedPoints) {
  return dayjs(sortedPoints[0].dateFrom).format('MMM DD');
}

function getTripInfoEndDate(sortedPoints) {
  const startDate = sortedPoints[0].dateFrom;
  const endDate = sortedPoints[sortedPoints.length - 1].dateTo;
  if (dayjs(startDate).format('MMM') === dayjs(endDate).format('MMM')) {
    return dayjs(endDate).format('DD');
  } else {
    return dayjs(endDate).format('MMM DD');
  }
}

function adaptToClient(point) {
  const adaptedPoint = {
    ...point,
    price: point['base_price'],
    dateFrom: point['date_from'],
    dateTo: point['date_to'],
    isFavorite: point['is_favorite']
  };

  delete adaptedPoint['base_price'];
  delete adaptedPoint['date_from'];
  delete adaptedPoint['date_to'];
  delete adaptedPoint['is_favorite'];
  return adaptedPoint;
}

function adaptToServer(point) {
  const adaptedPoint = {
    ...point,
    ['base_price']: point.price,
    ['date_from']: new Date(point.dateFrom).toISOString(),
    ['date_to']: new Date(point.dateTo).toISOString(),
    ['is_favorite']: point.isFavorite
  };

  delete adaptedPoint.price;
  delete adaptedPoint.dateFrom;
  delete adaptedPoint.dateTo;
  delete adaptedPoint.isFavorite;
  return adaptedPoint;
}
function isMinorUpdate(updatedPoint, prevPoint){
  return isDatesEqual(updatedPoint.dateTo, prevPoint.dateTo)
    || isDatesEqual(updatedPoint.dateFrom, prevPoint.dateFrom)
    || updatedPoint.price === prevPoint.price;
}
export {
  adaptToClient,
  adaptToServer,
  getDefaultPoint,
  getTimeInDays,
  getTimeInHours,
  getTimeInMinutes,
  getTripInfoEndDate,
  getTripInfoStartDate,
  getTripInfoTitle,
  sortPointTime,
  sortPointPrice,
  sortPointDay,
  updatePoints,
  isDatesEqual,
  isMinorUpdate,
  filter,
};
