import AbstractView from '../framework/view/abstract-view';
import {createEmptyListTemplate} from '../template/empty-list-template';

export default class EmptyListView extends AbstractView {
  #currentFilterType = null;
  #isLoading = false;
  #isLoadingError = false;

  constructor({currentFilterType, isLoading = false, isLoadingError = false}) {
    super();
    this.#currentFilterType = currentFilterType;
    this.#isLoading = isLoading;
    this.#isLoadingError = isLoadingError;
  }

  get template() {
    if (this.#isLoading) {
      return '<p class="trip-events__msg">Loading...</p>';
    }
    if (this.#isLoadingError) {
      return '<p class="trip-events__msg">Failed to load latest route information</p>';
    }
    return createEmptyListTemplate(this.#currentFilterType);
  }
}
