import {createPointTemplate} from '../template/point-template';
import AbstractView from '../framework/view/abstract-view';

export default class PointView extends AbstractView{
  #point = null;
  #destinations = null;
  #pointOffers = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;
  constructor({point, destinations, pointOffers, onEditClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#pointOffers = pointOffers;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template(){
    return createPointTemplate(this.#point, this.#destinations, this.#pointOffers);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
