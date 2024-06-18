import PointView from '../view/point-view';
import PointEditView from '../view/point-edit-view';
import {render, replace, remove} from '../framework/render';
import {UserAction, UpdateType, POINT_MODE} from '../const.js';
import {isMinorUpdate} from '../utils';


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
      onFavoriteClick: this.#favoriteClickHandler,
    });

    this.#editPointComponent = new PointEditView({
      point: this.#point,
      onSaveClick: this.#editPointSaveHandler,
      onDeleteClick: this.#editDeletePointHandler,
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
    prevEditPointComponent.removeElement();
  };

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
    this.#editPointComponent.removeElement();
  }

  resetView() {
    if (this.#pointMode !== POINT_MODE.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditToPointView();
    }
  }

  setSaving() {
    if (this.#pointMode === POINT_MODE.EDITING) {
      this.#editPointComponent.updateElement({
        isActive: false,
        isSaving: true
      });
    }
  }

  setDeleting() {
    this.#editPointComponent.updateElement({
      isActive: false,
      isDeleting: true
    });
  }

  setAborting() {
    if (this.#pointMode === POINT_MODE.EDITING) {
      const resetFormState = () => {
        this.#editPointComponent.updateElement({
          isActive: true,
          isSaving: false,
          isDeleting: false
        });
      };
      this.#editPointComponent.shake(resetFormState);
    } else {
      this.#editPointComponent.shake();
    }
  }

  #replacePointToEditView = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyHandler);
    this.#handleModeChange();
    this.#pointMode = POINT_MODE.EDITING;
  };

  #replaceEditToPointView = () => {
    if (this.#editPointComponent._state.isActive) {
      this.#editPointComponent.reset(this.#point);
      replace(this.#pointComponent, this.#editPointComponent);
      document.removeEventListener('keydown', this.#escKeyHandler);
      this.#pointMode = POINT_MODE.DEFAULT;
    }
  };

  #escKeyHandler = (evt) => {
    if (evt.key === 'Escape' && this.#editPointComponent._state.isActive) {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditToPointView();
    }
  };

  #favoriteClickHandler = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );
  };

  #editPointSaveHandler = (updatedPoint) => {
    const isMinor = isMinorUpdate(updatedPoint, this.#point);

    if (isMinor) {
      this.#handleDataChange(
        UserAction.UPDATE_POINT,
        isMinor ? UpdateType.MINOR : UpdateType.PATCH,
        updatedPoint
      );
    }
    if (this.#editPointComponent._state.isActive) {
      this.#replaceEditToPointView();
    }
  };

  #editDeletePointHandler = (updatedPoint) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      updatedPoint,
    );
  };
}
