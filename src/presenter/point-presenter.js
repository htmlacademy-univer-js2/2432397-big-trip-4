import PointView from '../view/point-view';
import PointEditView from '../view/point-edit-view';
import {render, replace, remove} from '../framework/render';


export default class PointPresenter{
  #point = null;

  #pointComponent = null;
  #editPointComponent = null;

  #container = null;
  #handleDataChange = null;
  constructor({container, onDataChange}) {
    this.#container = container;
    this.#handleDataChange = onDataChange;
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

    if (this.#container.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#container.contains(prevEditPointComponent.element)) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  };

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  #replacePointToEditView = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyHandler);
  };

  #replaceEditToPointView = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyHandler);
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
