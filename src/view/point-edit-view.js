import {createPointEditTemplate} from '../template/point-edit-template';
import {DEFAULT_POINT} from '../const';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {getMockOffers} from '../mock/offers';
import {getMockDestination} from '../mock/destination';

export default class PointEditView extends AbstractStatefulView{
  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint (state) {
    return {...state};
  }

  #submitClickHandler = null;
  #rollUpClickHandler = null;
  constructor({point = DEFAULT_POINT, onSubmitClick, onRollUpClick}) {
    super();
    this.#submitClickHandler = onSubmitClick;
    this.#rollUpClickHandler = onRollUpClick;
    this._setState(PointEditView.parsePointToState(point));
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editPointRollUpHandler);
    this.element.querySelector('form').addEventListener('submit', this.#editPointSubmitHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    //this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offerChangeHandler);
  }

  get template(){
    return createPointEditTemplate(this._state);
  }

  #editPointRollUpHandler = (evt) => {
    evt.preventDefault();
    this.#rollUpClickHandler();
  };

  #editPointSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#submitClickHandler(PointEditView.parseStateToPoint(this._state));
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      ...this._state.point,
      basePrice: evt.target.value
    });
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    const newType = evt.target.value;
    this.updateElement({
      type: newType,
      offers: getMockOffers(newType),
    });
  };

  #destinationChangeHandler = (evt) => {
    this.updateElement({
      destination: getMockDestination(evt.target.value),
    });
  };

  reset(point) {
    this.updateElement(
      PointEditView.parsePointToState(point)
    );
  }
}
