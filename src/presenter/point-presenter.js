import PointView from '../view/point-view';
import PointEditView from '../view/point-edit-view';
import {render, replace} from '../framework/render';


export default class PointPresenter{
  #point = null;
  #container = null;
  constructor({point, container}) {
    this.#point = point;
    this.#container = container;
  }

  init = () =>{
    const escKeyHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToPointView();
        document.removeEventListener('keydown', escKeyHandler);
      }
    };

    const pointComponent = new PointView({point: this.#point, onEditClick: () => {
      replacePointToEditView();
      document.addEventListener('keydown', escKeyHandler);
    }});

    const editPointComponent = new PointEditView({
      point: this.#point,
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

    render(pointComponent, this.#container.element);
  };
}
