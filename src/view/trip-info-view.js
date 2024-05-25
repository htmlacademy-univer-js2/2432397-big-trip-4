import {createTripInfoTemplate} from '../template/trip-info-template';
import AbstractView from '../framework/view/abstract-view';

export default class TripInfoView extends AbstractView{
  #points = null;
  #destinations = null;
  #offers = null;

  constructor(points, destinations, offers) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template(){
    return createTripInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}
