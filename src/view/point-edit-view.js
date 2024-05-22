import {createPointEditTemplate} from '../template/point-edit-template';
import {POINT_MODE} from '../const';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {getMockOffers} from '../mock/offers';
import {getMockDestination} from '../mock/destination';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {getDefaultPoint} from '../mock/waypoint';

export default class PointEditView extends AbstractStatefulView{
  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint (state) {
    return {...state};
  }

  #saveClickHandler = null;
  #rollUpClickHandler = null;
  #deleteClickHandler = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #mode = null;
  constructor({point = getDefaultPoint(), onSaveClick, onDeleteClick, onRollUpClick, mode = POINT_MODE.EDITING}) {
    super();
    this.#saveClickHandler = onSaveClick;
    this.#deleteClickHandler = onDeleteClick;
    this.#rollUpClickHandler = onRollUpClick;
    this.#mode = mode;
    this._setState(PointEditView.parsePointToState(point));
    this._restoreHandlers();
  }

  _restoreHandlers() {
    if (this.#mode === POINT_MODE.EDITING) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editPointRollUpHandler);
    }
    this.element.querySelector('form').addEventListener('submit', this.#editPointSaveHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#editPointDeleteHandler);

    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    //this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offerChangeHandler);

    this.#setDatepicker();
  }

  get template(){
    return createPointEditTemplate(this._state, this.#mode);
  }

  #editPointRollUpHandler = (evt) => {
    evt.preventDefault();
    this.#rollUpClickHandler();
  };

  #editPointSaveHandler = (evt) => {
    evt.preventDefault();
    this.#saveClickHandler(PointEditView.parseStateToPoint(this._state));
  };

  #editPointDeleteHandler = (evt) => {
    evt.preventDefault();
    this.#deleteClickHandler(PointEditView.parseStateToPoint(this._state));
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

  #setDatepicker = () => {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const config = {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      locale: {
        firstDayOfWeek: 1,
      },
      parseDate: function(date) {
        return flatpickr.parseDate(date, 'Y-m-d\\TH:i');
      },
      'time_24hr': true
    };

    if (this._state.dateFrom) {
      this.#datepickerFrom = flatpickr(
        dateFromElement,
        {
          ...config,
          defaultDate: this._state.dateFrom,
          maxDate: this._state.dateTo,
          onClose : this.#routePointDateFromCloseHandler,
        },
      );
    }

    if (this._state.dateTo) {
      this.#datepickerTo = flatpickr(
        dateToElement,
        {
          ...config,
          defaultDate: this._state.dateTo,
          minDate: this._state.dateFrom,
          onClose: this.#routePointDateToCloseHandler,
        },
      );
    }
  };

  #routePointDateFromCloseHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate
    });
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };

  #routePointDateToCloseHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate
    });
    this.#datepickerFrom.set('maxDate', this._state.dateTo);
  };


  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  reset(point) {
    this.updateElement(
      PointEditView.parsePointToState(point)
    );
  }
}
