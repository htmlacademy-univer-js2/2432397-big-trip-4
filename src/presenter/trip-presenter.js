import TripInfoView from '../view/trip-info-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import PointView from '../view/point-view';
import PointsListView from '../view/points-list-view';
import EditPointView from '../view/point-edit-view';
import {render, RenderPosition} from '../render';


export default class TripPresenter {
  constructor(pointsModel, containers) {
    this.pointsModel = pointsModel;
    this.containers = containers;
  }

  listPoints = new PointsListView();

  init() {
    this.tripPoints = [...this.pointsModel.getPoints()];

    render(new TripInfoView(), this.containers.tripInfoContainer, RenderPosition.AFTERBEGIN);
    render(new FilterView(), this.containers.filterContainer);
    render(new SortView(), this.containers.eventContainer);
    render(this.listPoints, this.containers.eventContainer);
    render(new EditPointView({ point: this.tripPoints[0] }), this.listPoints.getElement());

    for (let i = 1; i < this.tripPoints.length; i++) {
      render(new PointView({ point: this.tripPoints[i] }), this.listPoints.getElement());
    }
  }
}
