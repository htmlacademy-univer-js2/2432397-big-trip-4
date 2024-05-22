import AbstractView from '../framework/view/abstract-view';
import {createEmptyListTemplate} from '../template/empty-list-template';

export default class EmptyListView extends AbstractView {
  #currentFilterType = null;

  constructor(currentFilterType) {
    super();
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createEmptyListTemplate(this.#currentFilterType);
  }
}
