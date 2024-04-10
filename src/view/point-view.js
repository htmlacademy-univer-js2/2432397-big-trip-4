import {createPointTemplate} from '../template/point-template';
import AbstractView from '../framework/view/abstract-view';


export default class PointView extends AbstractView{
  #point = null;
  constructor({point}) {
    super();
    this.#point = point;
  }

  get template(){
    return createPointTemplate(this.point);
  }
}
