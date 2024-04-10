import {createPointEditTemplate} from '../template/point-edit-template';
import AbstractView from '../framework/view/abstract-view';

export default class PointEditView extends AbstractView{
  #point = null;
  constructor({point}) {
    super();
    this.#point = point;
  }

  get template(){
    return createPointEditTemplate(this.point);
  }
}
