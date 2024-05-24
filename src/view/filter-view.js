import {createFilterTemplate} from '../template/filter-template';
import AbstractView from '../framework/view/abstract-view';

export default class FilterView extends AbstractView{
  #currentFilterType = null;
  #handleFilterTypeChange = null;
  constructor({ currentFilterType, onFilterTypeChange }) {
    super();
    this.#currentFilterType = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template(){
    return createFilterTemplate(this.#currentFilterType);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
