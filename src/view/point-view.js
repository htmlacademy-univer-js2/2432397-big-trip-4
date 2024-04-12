import {createPointTemplate} from '../template/point-template';
import AbstractView from '../framework/view/abstract-view';

export default class PointView extends AbstractView{
  #point = null;
  #handleEditClick = null;
  constructor({point, onEditClick}) {
    super();
    this.#point = point;
    this.#handleEditClick = onEditClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template(){
    return createPointTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
