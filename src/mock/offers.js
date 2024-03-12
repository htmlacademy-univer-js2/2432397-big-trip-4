import {getRandomArrayElement, getRandomUUID} from '../utils.js';
import {OFFERS} from '../const.js';

export function getMockOffers(type){
  const OFFERS_COUNT = Math.floor(Math.random() * 5);
  return [
    {
      'type': type,
      'offers': getRandomOffers(OFFERS_COUNT)
    }];
}

function getRandomOffers(offersCount){
  return Array.from({ length: offersCount }, () => {
    const OFFER = getRandomArrayElement(OFFERS);
    return {
      'id' : getRandomUUID(),
      'title' : OFFER.title,
      'price' : OFFER.price
    };
  });
}
