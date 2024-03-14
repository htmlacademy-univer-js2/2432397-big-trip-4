import {createElement} from '../render';
import {createPointTemplate} from '../template/point-template';

export default class PointView{
  constructor({point}) {
    this.point = point;
  }

  getTemplate(){
    return createPointTemplate(this.point);
  }

  getElement(){
    if(!this.element){
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement(){
    this.element = null;
  }
}
