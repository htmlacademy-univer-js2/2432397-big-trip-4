import {FilterMessage} from '../const';

export function createEmptyListTemplate(currentFilterType) {
  return (
    `<p class="trip-events__msg">${FilterMessage[currentFilterType]}</p>`
  );
}
