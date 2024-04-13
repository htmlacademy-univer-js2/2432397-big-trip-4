import AbstractView from '../framework/view/abstract-view';
import {createEmptyListTemplate} from '../template/empty-list-template';

export default class EmptyListView extends AbstractView {
  get template() {
    return createEmptyListTemplate();
  }
}
