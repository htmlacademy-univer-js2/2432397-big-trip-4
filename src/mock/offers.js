import {getRandomArrayElement, getRandomUUID} from '../utils.js';
import {OFFERS} from '../const.js';

export function getMockOffers(type){
  const offersCount = Math.floor(Math.random() * 5 + 1);
  return {
    'type': type,
    'offers': getRandomOffers(offersCount)
  };
}

function getRandomOffers(offersCount){
  return Array.from({ length: offersCount }, () => {
    const offer = getRandomArrayElement(OFFERS);
    return {
      'id' : getRandomUUID(),
      'title' : offer.title,
      'price' : offer.price
    };
  });
}
