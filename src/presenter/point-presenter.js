import PointView from '../view/point-view';
import PointEditView from '../view/point-edit-view';
import {render, replace, remove} from '../framework/render';
import {UserAction, UpdateType} from '../const.js';
import {isDatesEqual} from '../utils';

const POINT_MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};
export default class PointPresenter{
  #point = null;

  #pointComponent = null;
  #editPointComponent = null;
  #container = null;

  #handleModeChange = null;
  #handleDataChange = null;

  #mode = POINT_MODE.DEFAULT;
  constructor({container, onDataChange, onModeChange}) {
    this.#container = container;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init = (point) =>{
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      onEditClick: this.#replacePointToEditView,
      onFavouriteClick: this.#handleFavouriteClick,
    });

    this.#editPointComponent = new PointEditView({
      point: this.#point,
      onSaveClick: this.#handleEditPointSave,
      onRollUpClick: this.#replaceEditToPointView,
    });


    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#mode === POINT_MODE.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === POINT_MODE.EDITING) {
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
    if (this.#mode !== POINT_MODE.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditToPointView();
    }
  }

  #replacePointToEditView = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyHandler);
    this.#handleModeChange();
    this.#mode = POINT_MODE.EDITING;
  };

  #replaceEditToPointView = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyHandler);
    this.#mode = POINT_MODE.DEFAULT;
  };

  #escKeyHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditToPointView();
    }
  };

  #handleFavouriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      {...this.#point, isFavourite: !this.#point.isFavourite}
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
}
