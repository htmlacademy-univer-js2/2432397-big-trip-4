import FilterView from '../view/filter-view';
import { remove, render, replace } from '../framework/render';
import { UpdateType } from '../const.js';

export default class FilterPresenter {
  #filterComponent = null;
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;
  #addPointButton = null;

  constructor({ filterContainer, filterModel, pointsModel, addPointButton }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
    this.#addPointButton = addPointButton;

    this.#filterModel.addObserver(this.#modelEventHandler);
    this.#pointsModel.addObserver(this.#modelEventHandler);
  }

  init() {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      currentFilterType: this.#filterModel.filterType,
      onFilterTypeChange: this.#filterTypeChangeHandler,
    });

    if (!prevFilterComponent){
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  destroy() {
    remove(this.#filterComponent);
  }

  #modelEventHandler = () => {
    this.init();
  };

  #filterTypeChangeHandler = (filterType) => {
    this.#addPointButton.disabled = false;
    if (filterType === this.#filterModel.filter) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
