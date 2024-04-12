import { getMockPoint } from '../mock/waypoint.js';

const POINT_COUNT = 4;

export default class PointsModel {
  #points = Array.from({ length: POINT_COUNT }, () => getMockPoint());

  get points() {
    return this.#points;
  }
}
