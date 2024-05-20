import {getRandomUUID} from '../utils.js';
import {OFFERS} from '../const.js';

export function getMockOffers(type){
  return {
    'type': type,
    'offers': getOffers(type)
  };
}

function getOffers(currentType){
  const correspondOffers = OFFERS.find(([type]) => type === currentType.toLowerCase());
  return correspondOffers ? correspondOffers[1].map((offer) => ({
    'id': getRandomUUID(),
    'title': offer.title,
    'price': offer.price
  })) : [];
}
