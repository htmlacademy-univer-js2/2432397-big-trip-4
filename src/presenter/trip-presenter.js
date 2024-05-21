import TripInfoView from '../view/trip-info-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import PointsListView from '../view/points-list-view';
import {remove, render, RenderPosition} from '../framework/render.js';
import EmptyListView from '../view/empty-list-view';
import PointPresenter from './point-presenter';
import {sortPointTime, sortPointDay, sortPointPrice} from '../utils';
import {SortTypes, UpdateType, UserAction} from '../const';


export default class TripPresenter {
  #pointsModel = null;
  #containers = null;
  #listPoints = new PointsListView();
  #pointPresenters = new Map();
  #currentSortType = SortTypes.DAY;

  #sortComponent = null;
  #emptyListComponent = null;
  #tripInfoComponent = null;

  constructor(pointsModel, containers) {
    this.#pointsModel = pointsModel;
    this.#containers = containers;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const points = this.#pointsModel.points;

    switch(this.#currentSortType) {
      case SortTypes.DAY:
        return sortPointDay([...points]);
      case SortTypes.TIME:
        return sortPointTime([...points]);
      case SortTypes.PRICE:
        return sortPointPrice([...points]);
    }

    return points;
  }

  init() {
    this.#renderTrip();
  }

  #renderTrip = () => {
    render(new FilterView(), this.#containers.filterContainer);

    if (this.points.length === 0) {
      this.#renderEmptyList();
      return;
    }

    this.#renderTripInfo();
    this.#renderSort();
    render(this.#listPoints, this.#containers.eventContainer);

    this.#renderAllPoints();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      container: this.#listPoints.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderEmptyList = () => {
    this.#emptyListComponent = new EmptyListView();
    render(new EmptyListView(), this.#containers.eventContainer);
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortComponent, this.#containers.eventContainer);
  }

  #renderTripInfo(){
    this.#tripInfoComponent = new TripInfoView();
    render(this.#tripInfoComponent, this.#containers.tripInfoContainer, RenderPosition.AFTERBEGIN);
  }

  #renderAllPoints = () => {
    this.points.forEach((point) => this.#renderPoint(point));
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearTrip();
    this.#renderTrip();
  };

  #clearTrip = ({ resetSortType = false } = {}) => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#emptyListComponent);
    remove(this.#tripInfoComponent);
    remove(this.#sortComponent);

    //this.#filterPresenter.destroy(); это пока оставить закоммент

    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  };

  #handleViewAction = (actionType, updateType, updatedPoint) => {
    switch(actionType) {
      case UserAction.UPDATE_TASK:
        this.#pointsModel.updatePoint(updateType, updatedPoint);
        break;
      case UserAction.ADD_TASK:
        this.#pointsModel.addPoint(updateType, updatedPoint);
        break;
      case UserAction.DELETE_TASK:
        this.#pointsModel.deletePoint(updateType, updatedPoint);
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({ resetSortType: true });
        this.#renderTrip();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
