import {getRandomArrayElement, getRandomUUID} from '../utils.js';
import { DATES, PRICES, TYPE_POINTS} from '../const.js';
import {getMockOffers} from './offers.js';
import {getMockDestination} from './destination.js';

export function getMockPoint(){
  const date = getRandomArrayElement(DATES);
  const price = getRandomArrayElement(PRICES);
  const type = getRandomArrayElement(TYPE_POINTS);
  const isFavourite = Math.floor(Math.random() * 10) % 2 === 0;
  return {
    'id' : getRandomUUID(),
    'basePrice': price,
    'dateFrom': date.from,
    'dateTo': date.to,
    'destination': getMockDestination(),
    'isFavourite': isFavourite,
    'offers': getMockOffers(type),
    'type': type
  };
}
