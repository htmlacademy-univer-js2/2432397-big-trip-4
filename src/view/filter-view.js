import {createElement} from '../render';
import {createFilterTemplate} from '../template/filter-template';

export default class FilterView{
  getTemplate(){
    return createFilterTemplate();
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
