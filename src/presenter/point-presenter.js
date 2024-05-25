import PointView from '../view/point-view';
import PointEditView from '../view/point-edit-view';
import {render, replace, remove} from '../framework/render';
import {UserAction, UpdateType, POINT_MODE} from '../const.js';
import {isDatesEqual} from '../utils';


export default class PointPresenter{
  #point = null;
  #destinationsModel = null;
  #offersModel = null;

  #pointComponent = null;
  #editPointComponent = null;
  #container = null;

  #handleModeChange = null;
  #handleDataChange = null;

  #pointMode = POINT_MODE.DEFAULT;
  constructor({container, onDataChange, onModeChange, destinationsModel, offersModel}) {
    this.#container = container;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init = (point) =>{
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      destinations: this.#destinationsModel.destinations,
      pointOffers: this.#offersModel.getByType(point.type),
      onEditClick: this.#replacePointToEditView,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#editPointComponent = new PointEditView({
      point: this.#point,
      onSaveClick: this.#handleEditPointSave,
      onDeleteClick: this.#handleEditDeletePoint,
      onRollUpClick: this.#replaceEditToPointView,
      pointsOffers: this.#offersModel.offers,
      pointsDestinations: this.#destinationsModel.destinations,
    });


    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#pointMode === POINT_MODE.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointMode === POINT_MODE.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  };

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  resetView() {
    if (this.#pointMode !== POINT_MODE.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditToPointView();
    }
  }

  #replacePointToEditView = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyHandler);
    this.#handleModeChange();
    this.#pointMode = POINT_MODE.EDITING;
  };

  #replaceEditToPointView = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyHandler);
    this.#pointMode = POINT_MODE.DEFAULT;
  };

  #escKeyHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditToPointView();
    }
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );
  };

  #handleEditPointSave = (updatedPoint) => {
    this.#replaceEditToPointView();
    const isMinorUpdate = isDatesEqual(updatedPoint.dateTo, this.#point.dateTo)
      || isDatesEqual(updatedPoint.dateFrom, this.#point.dateFrom)
      || updatedPoint.price === this.#point.price;

    this.#handleDataChange(
      UserAction.UPDATE_TASK,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      updatedPoint,
    );
  };

  #handleEditDeletePoint = (updatedPoint) => {
    this.#handleDataChange(
      UserAction.DELETE_TASK,
      UpdateType.MINOR,
      updatedPoint,
    );
  };
}
