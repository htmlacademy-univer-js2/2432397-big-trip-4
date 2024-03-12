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
    'base_price': price,
    'date_from': date.from,
    'date_to': date.to,
    'destination': getMockDestination(),
    'is_favorite': isFavourite,
    'offers': getMockOffers(type),
    'type': type
  };
}
