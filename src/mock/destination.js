import {getRandomArrayElement, getRandomUUID} from '../utils.js';
import {CITIES} from '../const.js';

export function getMockDestination(){
  const PICTURES_COUNT = Math.floor(Math.random() * 5);
  const CITY = getRandomArrayElement(CITIES);
  const CITY_NAME = CITY.name;
  return [
    {
      'id': getRandomUUID(),
      'description': CITY.description,
      'name': CITY_NAME,
      'pictures': getRandomPictures(PICTURES_COUNT, CITY_NAME)
    }];
}

function getRandomPictures(picturesCount, cityName){
  return Array.from({ length: picturesCount }, () => {
    return {
      'src': `https://loremflickr.com/248/152/${cityName},city/all`,
      'description': cityName
    };
  });
}
