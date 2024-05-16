import TripInfoView from '../view/trip-info-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import PointsListView from '../view/points-list-view';
import {render, RenderPosition} from '../framework/render.js';
import EmptyListView from '../view/empty-list-view';
import PointPresenter from './point-presenter';
import {updateItem} from '../utils';


export default class TripPresenter {
  #pointsModel = null;
  #containers = null;
  #tripPoints = null;
  #listPoints = new PointsListView();
  #pointPresenters = new Map();

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
    render(new SortView(), this.#containers.eventContainer);
    render(this.#listPoints, this.#containers.eventContainer);

    this.#tripPoints.forEach((point) => this.#renderPoint(point));
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      container: this.#listPoints.element,
      onDataChange: this.#handleTaskChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderEmptyList = () => {
    render(new EmptyListView(), this.#containers.eventContainer);
  };

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handleTaskChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };
}
