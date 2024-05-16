import PointView from '../view/point-view';
import PointEditView from '../view/point-edit-view';
import {render, replace, remove} from '../framework/render';

const MODE = {
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

  #mode = MODE.DEFAULT;
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
      onSubmitClick: this.#replaceEditToPointView,
      onRollUpClick: this.#replaceEditToPointView,
    });


    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#mode === MODE.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === MODE.EDITING) {
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
    if (this.#mode !== MODE.DEFAULT) {
      this.#replaceEditToPointView();
    }
  }

  #replacePointToEditView = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyHandler);
    this.#handleModeChange();
    this.#mode = MODE.EDITING;
  };

  #replaceEditToPointView = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyHandler);
    this.#mode = MODE.DEFAULT;
  };

  #escKeyHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditToPointView();
    }
  };

  #handleFavouriteClick = () => {
    this.#handleDataChange({...this.#point, isFavourite: !this.#point.isFavourite});
  };
}
