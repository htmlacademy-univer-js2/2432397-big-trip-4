import {createPointEditTemplate} from '../template/point-edit-template';
import AbstractView from '../framework/view/abstract-view';
import {DEFAULT_POINT} from '../const';

export default class PointEditView extends AbstractView{
  #point = null;
  #onSubmitClick = null;
  #onRollUpClick = null;
  constructor({point = DEFAULT_POINT, onSubmitClick, onRollUpClick}) {
    super();
    this.#point = point;
    this.#onSubmitClick = onSubmitClick;
    this.#onRollUpClick = onRollUpClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editPointRollUpHandler);
    this.element.querySelector('form').addEventListener('submit', this.#editPointSubmitHandler);
  }

  get template(){
    return createPointEditTemplate(this.#point);
  }

  #editPointRollUpHandler = (evt) => {
    evt.preventDefault();
    this.#onRollUpClick();
  };

  #editPointSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onSubmitClick();
  };
}
