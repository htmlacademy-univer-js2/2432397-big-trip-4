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
      onSaveClick: this.#editPointSaveHandler,
      onDeleteClick: this.#editPointCancelHandler,
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

  setSaving() {
    this.#newPointComponent.updateElement({
      isActive: false,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#newPointComponent.updateElement({
        isActive: true,
        isSaving: false,
        isDeleting: false
      });
    };
   // this.#newPointComponent.shake(resetFormState); кидает ошибку тк не видит this.#newPointComponent
   //  Если в процессе запроса произошла ошибка:
   //
   //    разблокируйте форму и интерфейс;
   //  верните текст кнопок к исходному варианту;
   //  добавьте всей форме эффект «покачивания головой».
  }

  #editPointSaveHandler = (updatedPoint) => {
    this.#addPointButton.disabled = false;
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      updatedPoint,
    );
    this.destroy();
  };

  #editPointCancelHandler = () => {
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
