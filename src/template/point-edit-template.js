import dayjs from 'dayjs';
import {POINT_MODE, TYPE_POINTS, EditPointViewButtonText} from '../const';

export function createPointEditTemplate(state, currentMode, offers, destinations){
  const { id, type, price, dateFrom, dateTo, offers: currentOffers } = state;
  const { isActive, isSaving, isDeleting } = state;
  const isCreating = currentMode === POINT_MODE.CREATING;
  const currentDestination = destinations?.find((destination) => destination.id === state.destination);
  const name = currentDestination ? currentDestination.name : '';
  const description = currentDestination?.description;
  const pictures = currentDestination?.pictures;

  const offersByType = offers.find((offer) => offer.type === type.toLowerCase());

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${createEditTypePointTemplate(type, id, isActive)}
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${id}">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${name}" list="destination-list-${id}" ${isActive ? '' : 'disabled'}>
          ${destinations ? createDestinationList(destinations, id) : ''}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${id}">From</label>
          <input class="event__input  event__input--time" id="event-start-time-${id}" type="text"
          name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}" ${isActive ? '' : 'disabled'}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-${id}">To</label>
          <input class="event__input  event__input--time" id="event-end-time-${id}" type="text"
           name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}" ${isActive ? '' : 'disabled'}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${id}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${id}" type="number" name="event-price" value="${price}" ${isActive ? '' : 'disabled'}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isActive ? '' : 'disabled'}>${isSaving ? EditPointViewButtonText.LOAD_SAVE : EditPointViewButtonText.SAVE}</button>
        ${createButtonTemplate(isCreating, isActive, isDeleting)}
        ${isCreating ? '' : '<button class="event__rollup-btn" type="button"> <span class="visually-hidden">Open event</span> </button>'}

      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          ${createPointOffersTemplate(offersByType, currentOffers, isActive)}
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

function createButtonTemplate(isCreating, isActive, isDeleting) {
  let text;
  if (isCreating) {
    text = EditPointViewButtonText.CANCEL;
  }
  else {
    text = isDeleting ? EditPointViewButtonText.LOAD_DELETE : EditPointViewButtonText.DELETE;
  }
  return `<button class="event__reset-btn" type="reset" ${isActive ? '' : 'disabled'}>${text}</button>`;
}

function createEditTypePointTemplate(currentType, pointId, isActive) {
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
              <input id="event-type-${type.toLowerCase()}-${pointId}" class="event__type-input  visually-hidden"
               type="radio" name="event-type" value="${type.toLowerCase()}" ${type.toLowerCase() === currentType ? 'checked' : ''} ${isActive ? '' : 'disabled'}>
              <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-${pointId}">${type}</label>
            </div>`), '')}
        </fieldset>
      </div>
    </div>`);
}


function createDestinationList(destinations, pointId) {
  return (`<datalist id="destination-list-${pointId}">
           ${destinations.map((destination) => `<option value="${destination.name}"></option>`).join('')}
           </datalist>`);
}

function createPointOffersTemplate(offers, selectedOffers, isActive) {
  if(!offers) {
    return '';}

  const offerItems = offers.offers.map((offer) => {
    const offerName = offer.title.replaceAll(' ', '').toLowerCase();
    return (`<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" type="checkbox" name="event-offer-${offerName}"
                 id="${offer.id}" ${selectedOffers?.includes(offer.id) ? 'checked' : '' } ${isActive ? '' : 'disabled'}>
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
