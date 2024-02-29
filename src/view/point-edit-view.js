import {createElement} from '../render';
import {createPointEditTemplate} from '../template/point-edit-template';

export default class PointEditView{
  getTemplate(){
    return createPointEditTemplate();
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
