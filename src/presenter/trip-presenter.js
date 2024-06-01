import TripInfoView from '../view/trip-info-view';
import SortView from '../view/sort-view';
import PointsListView from '../view/points-list-view';
import {remove, render, RenderPosition} from '../framework/render.js';
import EmptyListView from '../view/empty-list-view';
import PointPresenter from './point-presenter';
import {sortPointTime, sortPointDay, sortPointPrice, filter} from '../utils';
import {SortTypes, TimeLimit, UpdateType, UserAction} from '../const';
import FilterPresenter from './filter-presenter';
import NewPointPresenter from './new-point-presenter';
import UiBlocker from '../framework/ui-blocker/ui-blocker';


export default class TripPresenter {
  #containers = null;
  #listPoints = new PointsListView();
  #pointsModel = null;
  #pointPresenters = new Map();
  #filterModel = null;
  #filterPresenter = null;
  #newPointPresenter = null;
  #offersModel = null;
  #destinationsModel = null;
  #currentSortType = SortTypes.DAY;
  #filterType = null;

  #sortComponent = null;
  #emptyListComponent = null;
  #tripInfoComponent = null;

  #addPointButton = null;

  #isLoading = true;
  #isLoadingError = false;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({pointsModel, offersModel, destinationsModel, filterModel, containers, addPointButton}) {
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;
    this.#containers = containers;
    this.#addPointButton = addPointButton;
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#addPointButton.addEventListener('click', this.#handleCreateNewPoint);
  }

  get points() {
    this.#filterType = this.#filterModel.filterType;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch(this.#currentSortType) {
      case SortTypes.DAY:
        return sortPointDay([...filteredPoints]);
      case SortTypes.TIME:
        return sortPointTime([...filteredPoints]);
      case SortTypes.PRICE:
        return sortPointPrice([...filteredPoints]);
    }

    return filteredPoints;
  }

  init() {
    this.#renderTrip();
  }

  #renderTrip = () => {
    if (this.#isLoading) {
      this.#renderEmptyList({isLoading: true});
      return;
    }

    if (this.#isLoadingError) {
      this.#renderEmptyList({isLoadingError: true});
      return;
    }

    this.#renderFilter();

    if (this.points.length === 0) {
      this.#renderEmptyList();
      return;
    }

    this.#renderTripInfo();
    this.#renderSort();
    render(this.#listPoints, this.#containers.eventContainer);

    this.#renderAllPoints();
  };

  #renderFilter = () => {
    this.#filterPresenter = new FilterPresenter({
      filterContainer: this.#containers.filterContainer,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel,
    });
    this.#filterPresenter.init();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      container: this.#listPoints.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderEmptyList = ({isLoading = false, isLoadingError = false} = {}) => {
    this.#emptyListComponent = new EmptyListView({
      currentFilterType : this.#filterType,
      isLoading,
      isLoadingError,
    });
    render(this.#emptyListComponent, this.#containers.eventContainer);
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortComponent, this.#containers.eventContainer);
  }

  #renderTripInfo(){
    this.#tripInfoComponent = new TripInfoView(this.points, this.#destinationsModel.destinations, this.#offersModel.offers);
    render(this.#tripInfoComponent, this.#containers.tripInfoContainer, RenderPosition.AFTERBEGIN);
  }

  #renderAllPoints = () => {
    this.points.forEach((point) => this.#renderPoint(point));
  };

  #renderNewPoint() {
    this.#newPointPresenter = new NewPointPresenter({
      container: this.#listPoints.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      addPointButton: this.#addPointButton,
    });

    if(this.#emptyListComponent){
      remove(this.#emptyListComponent);
      render(this.#listPoints, this.#containers.eventContainer);
    }
    this.#newPointPresenter.init();
  }


  #clearTrip = ({ resetSortType = false } = {}) => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    if(this.#emptyListComponent){
      remove(this.#emptyListComponent);
    }
    remove(this.#tripInfoComponent);
    remove(this.#sortComponent);

    if (this.#filterPresenter) {
      this.#filterPresenter.destroy();
    }
    if (this.#newPointPresenter){
      this.#newPointPresenter.destroy();
    }

    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearTrip();
    this.#renderTrip();
  };

  #handleCreateNewPoint = (evt) => {
    evt.preventDefault();
    this.#renderNewPoint();
    this.#addPointButton.disabled = true;
  };

  #handleViewAction = async (actionType, updateType, updatedPoint) => {
    this.#uiBlocker.block();
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(updatedPoint.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, updatedPoint);
        } catch (err) {
          this.#pointPresenters.get(updatedPoint.id).setAborting();
        }
        break;

      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, updatedPoint);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;

      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(updatedPoint.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, updatedPoint);
        } catch (err) {
          this.#pointPresenters.get(updatedPoint.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        if (data.isError) {
          this.#isLoadingError = data.isError;
        }
        this.#isLoading = false;
        this.#clearTrip();
        this.#renderTrip();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
