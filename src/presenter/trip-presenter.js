import TripInfoView from '../view/trip-info-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import PointView from '../view/point-view';
import PointsListView from '../view/points-list-view';
import PointEditView from '../view/point-edit-view';
import {render, RenderPosition, replace} from '../framework/render.js';
import EmptyListView from '../view/empty-list-view';


export default class TripPresenter {
  #pointsModel = null;
  #containers = null;
  #tripPoints = null;
  #listPoints = new PointsListView();
  constructor(pointsModel, containers) {
    this.#pointsModel = pointsModel;
    this.#containers = containers;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];

    this.#renderTrip();
  }

  #renderTrip = () => {
    render(new FilterView(), this.#containers.filterContainer);
    if (this.#tripPoints.length > 0) {
      render(new TripInfoView(), this.#containers.tripInfoContainer, RenderPosition.AFTERBEGIN);
      render(new SortView(), this.#containers.eventContainer);
      render(this.#listPoints, this.#containers.eventContainer);

      this.#tripPoints.forEach((point) => this.#renderPoint(point));
    }
    else{
      render(new EmptyListView(), this.#containers.eventContainer);
    }
  };

  #renderPoint = (point) => {
    const escKeyHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToPointView();
        document.removeEventListener('keydown', escKeyHandler);
      }
    };

    const pointComponent = new PointView({point: point, onEditClick: () => {
      replacePointToEditView();
      document.addEventListener('keydown', escKeyHandler);
    }});

    const editPointComponent = new PointEditView({point: point,
      onSubmitClick: () => {
        replaceEditToPointView();
        document.addEventListener('keydown', escKeyHandler);
      },
      onRollUpClick: () => {
        replaceEditToPointView();
        document.addEventListener('keydown', escKeyHandler);
      }
    });

    function replacePointToEditView() {
      replace(editPointComponent, pointComponent);
    }

    function replaceEditToPointView() {
      replace(pointComponent, editPointComponent);
    }

    render(pointComponent, this.#listPoints.element);
  };
}
