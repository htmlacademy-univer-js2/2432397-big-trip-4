import TripInfoView from '../view/trip-info-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import PointView from '../view/point-view';
import PointsListView from '../view/points-list-view';
import EditPointView from '../view/point-edit-view';
import {render, RenderPosition} from '../render';

const containers = {
  tripInfoContainer: document.querySelector('.trip-main'),
  filterContainer: document.querySelector('.trip-controls__filters'),
  eventContainer: document.querySelector('.trip-events')
};

export default class TripPresenter {
  listPoints = new PointsListView();

  init() {
    render(new TripInfoView(), containers.tripInfoContainer, RenderPosition.AFTERBEGIN);
    render(new FilterView(), containers.filterContainer);
    render(new SortView(), containers.eventContainer);
    render(this.listPoints, containers.eventContainer);
    render(new EditPointView(), this.listPoints.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.listPoints.getElement());
    }
  }
}
