import TripInfoView from '../view/trip-info-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import PointsListView from '../view/points-list-view';
import {render, RenderPosition} from '../framework/render.js';
import EmptyListView from '../view/empty-list-view';
import PointPresenter from './point-presenter';
import {updateItem, sortPointTime, sortPointDay, sortPointPrice} from '../utils';
import {SortTypes} from '../const';


export default class TripPresenter {
  #pointsModel = null;
  #containers = null;
  #tripPoints = null;
  #listPoints = new PointsListView();
  #pointPresenters = new Map();
  #sortComponent = null;
  #currentSortType = SortTypes.DAY;

  constructor(pointsModel, containers) {
    this.#pointsModel = pointsModel;
    this.#containers = containers;
  }

  init() {
    this.#renderTrip();
  }

  #renderTrip = () => {
    this.#tripPoints = [...this.#pointsModel.points];

    render(new FilterView(), this.#containers.filterContainer);

    if (this.#tripPoints.length === 0) {
      this.#renderEmptyList();
      return;
    }

    render(new TripInfoView(), this.#containers.tripInfoContainer, RenderPosition.AFTERBEGIN);
    this.#renderSort();
    render(this.#listPoints, this.#containers.eventContainer);

    this.#renderAllPoints();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      container: this.#listPoints.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderEmptyList = () => {
    render(new EmptyListView(), this.#containers.eventContainer);
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#onSortTypeChange,
    });
    render(this.#sortComponent, this.#containers.eventContainer);
  }

  #renderAllPoints = () =>{
    this.#tripPoints.forEach((point) => this.#renderPoint(point));
  };

  #onSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);

    this.#clearPointsList();
    this.#renderAllPoints();
  };

  #sortPoints = (sortType) => {
    switch(sortType) {
      case SortTypes.DAY:
        this.#tripPoints = sortPointDay([...this.#tripPoints]);
        break;
      case SortTypes.TIME:
        this.#tripPoints = sortPointTime([...this.#tripPoints]);
        break;
      case SortTypes.PRICE:
        this.#tripPoints = sortPointPrice([...this.#tripPoints]);
        break;
    }

    this.#currentSortType = sortType;
  };

  #clearPointsList = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
