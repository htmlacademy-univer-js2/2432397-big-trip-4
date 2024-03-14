import {getRandomArrayElement, getRandomUUID} from '../utils.js';
import {CITIES} from '../const.js';

const PICTURES_COUNT = 5;

export function getMockDestination(){
  const city = getRandomArrayElement(CITIES);
  const cityName = city.name;
  return{
    'id': getRandomUUID(),
    'description': city.description,
    'cityName': cityName,
    'pictures': getRandomPictures( cityName)
  };
}

function getRandomPictures(cityName){
  return Array.from({ length: PICTURES_COUNT }, () => ({
    'src': `https://loremflickr.com/248/152/?random=${Math.floor(Math.random() * PICTURES_COUNT * PICTURES_COUNT)}`,
    'description': cityName
  }));
}
