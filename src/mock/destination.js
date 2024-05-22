import {getRandomUUID} from '../utils.js';
import {DESTINATIONS} from '../const';

const PICTURES_COUNT = 5;

export function getMockDestination(cityName){
  const correspondCityData = DESTINATIONS.find((city) => city.name === cityName);
  return{
    'id': getRandomUUID(),
    'description': correspondCityData.description,
    'cityName': cityName,
    'pictures': getRandomPictures(cityName)
  };
}

function getRandomPictures(cityName){
  return Array.from({ length: PICTURES_COUNT }, () => ({
    'src': `https://loremflickr.com/248/152/?random=${Math.floor(Math.random() * PICTURES_COUNT * PICTURES_COUNT)}`,
    'description': cityName
  }));
}

export function getDefaultDestination() {
  return {
    'id': null,
    'description': null,
    'cityName' : '',
    'pictures' : null,
  };
}
