import {createSortTemplate} from '../template/sort-template';
import AbstractView from '../framework/view/abstract-view';

export default class SortView extends AbstractView{
  get template(){
    return createSortTemplate();
  }
}
