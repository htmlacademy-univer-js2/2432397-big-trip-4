import {createPointTemplate} from '../template/point-template';
import AbstractView from '../framework/view/abstract-view';

export default class PointView extends AbstractView{
  #point = null;
  #handleEditClick = null;
  #handleFavouriteClick = null;
  constructor({point, onEditClick, onFavouriteClick}) {
    super();
    this.#point = point;
    this.#handleEditClick = onEditClick;
    this.#handleFavouriteClick = onFavouriteClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favouriteClickHandler);
  }

  get template(){
    return createPointTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favouriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavouriteClick();
  };
}
