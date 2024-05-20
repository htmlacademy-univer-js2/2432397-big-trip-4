import dayjs from 'dayjs';

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

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

function sortPointDay(points) {
  return points.sort((firstPoint, secondPoint) => new Date(firstPoint.dateFrom) - new Date(secondPoint.dateTo));
}

function sortPointTime(points) {
  return points.sort((firstPoint, secondPoint) =>
    dayjs(firstPoint.dateFrom).diff(dayjs(firstPoint.dateTo), 'minutes') -
    dayjs(secondPoint.dateFrom).diff(dayjs(secondPoint.dateTo), 'minutes'));
}

function sortPointPrice(points) {
  return points.sort((firstPoint, secondPoint) => secondPoint.basePrice - firstPoint.basePrice);
}

export {
  getRandomArrayElement,
  getRandomUUID,
  getTimeInDays,
  getTimeInHours,
  getTimeInMinutes,
  updateItem,
  sortPointTime,
  sortPointPrice,
  sortPointDay,
};
