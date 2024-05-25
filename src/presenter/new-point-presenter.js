import EditPointView from '../view/point-edit-view';
import { RenderPosition, remove, render } from '../framework/render';
import { UserAction, UpdateType, POINT_MODE } from '../const';

export default class NewPointPresenter {
  #container = null;
  #newPointComponent = null;
  #handleDataChange = null;
  #addPointButton = null;
  #destinationsModel = null;
  #offersModel = null;
  #mode = null;

  constructor({ container, offersModel, destinationsModel, onDataChange, addPointButton }) {
    this.#container = container;
    this.#handleDataChange = onDataChange;
    this.#addPointButton = addPointButton;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#mode = POINT_MODE.CREATING;
  }

  init() {
    if (this.#newPointComponent !== null) {
      return;
    }

    this.#newPointComponent = new EditPointView({
      onSaveClick: this.#handleEditPointSave,
      onDeleteClick: this.#handleEditCancelPoint,
      onRollUpClick: null,
      pointsOffers: this.#offersModel.offers,
      pointsDestinations: this.#destinationsModel.destinations,
      mode: this.#mode,
    });

    render(this.#newPointComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  destroy() {
    if (this.#newPointComponent === null) {
      return;
    }
    remove(this.#newPointComponent);
    this.#newPointComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleEditPointSave = (updatedPoint) => {
    this.#addPointButton.disabled = false;
    this.#handleDataChange(
      UserAction.ADD_TASK,
      UpdateType.MAJOR,
      updatedPoint,
    );
    this.destroy();
  };

  #handleEditCancelPoint = () => {
    this.#addPointButton.disabled = false;
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
