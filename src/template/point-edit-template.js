import dayjs from 'dayjs';
import {POINT_MODE, TYPE_POINTS} from '../const';

export function createPointEditTemplate(point, currentMode, offers, destinations){
  const { type, price, dateFrom, dateTo, offers: currentOffers } = point;

  const currentDestination = destinations?.find((destination) => destination.id === point.destination);
  const name = currentDestination ? currentDestination.name : '';
  const description = currentDestination?.description;
  const pictures = currentDestination?.pictures;

  const offersByType = offers.find((offer) => offer.type === type.toLowerCase());

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${createEditTypePointTemplate(type)}
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
          ${destinations ? createDestinationList(destinations) : ''}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${currentMode === POINT_MODE.EDITING ? 'Delete' : 'Cancel'}</button>
        ${currentMode === POINT_MODE.EDITING ? `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>` : ''}
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          ${createPointOffersTemplate(offersByType, currentOffers)}
         </section>

        <section class="event__section  event__section--destination">
        ${description ? `
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>` : ''}

          ${createPicturesTemplate(pictures)}
        </section>
      </section>
    </form>
  </li>
  `;
}

function createEditTypePointTemplate(currentType) {
  return (
    `<div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${currentType}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${TYPE_POINTS.reduce((acc, type) => (`${acc}
            <div class="event__type-item">
              <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === currentType ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
            </div>`), '')}
        </fieldset>
      </div>
    </div>`);
}


function createDestinationList(destinations) {
  return (`<datalist id="destination-list-1">
           ${destinations.map((destination) => `<option value="${destination.name}"></option>`).join('')}
           </datalist>`);
}

function createPointOffersTemplate(offers, selectedOffers) {
  if(!offers) {
    return '';}

  const offerItems = offers.offers.map((offer) => {
    const offerName = offer.title.replaceAll(' ', '').toLowerCase();
    return (`<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" type="checkbox" name="event-offer-${offerName}" id="${offer.id}" ${selectedOffers?.includes(offer.id) ? 'checked' : ''}>
                <label class="event__offer-label" for="${offer.id}">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                </label>
            </div>`);
  }).join('');

  return `<h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">${offerItems}</div>`;
}

function createPicturesTemplate(pictures) {
  return !pictures || pictures.length === 0 ? '' :
    (`<div class="event__photos-container">
        <div class="event__photos-tape">
        ${pictures.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join('')}
        </div>
      </div>`);
}
