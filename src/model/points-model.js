import Observable from '../framework/observable';
import {adaptToClient, adaptToServer, updatePoints} from '../utils';
import {UpdateType} from '../const';


export default class PointsModel extends Observable{
  #pointsApiService = null;
  #points = [];
  #destinationsModel = null;
  #offersModel = null;
  constructor({pointsApiService, destinationsModel, offersModel}) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      await Promise.all([
        this.#destinationsModel.init(),
        this.#offersModel.init()
      ]);
      const points = await this.#pointsApiService.points;
      this.#points = points.map(adaptToClient);
      this._notify(UpdateType.INIT, {});
    } catch (err) {
      this.#points = [];
      this._notify(UpdateType.INIT, {isError: true});
    }
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update non-existing point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(adaptToServer(update));
      const updatedPoint = adaptToClient(response);
      this.#points = updatePoints(this.#points, updatedPoint);
      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, point) {
    try {
      const response = await this.#pointsApiService.addPoint(adaptToServer(point));
      const newPoint = adaptToClient(response);
      this.#points.push(newPoint);
      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, deletedPoint) {
    const index = this.#points.findIndex((point) => point.id === deletedPoint.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(deletedPoint.id);
      this.#points = this.#points.filter((item) => item.id !== deletedPoint.id);
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete point');
    }
  }
}
