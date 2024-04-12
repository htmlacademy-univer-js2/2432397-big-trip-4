import {createPointsListTemplate} from '../template/points-list-template';
import AbstractView from '../framework/view/abstract-view';

export default class PointsListView extends AbstractView{
  get template() {
    return createPointsListTemplate();
  }
}
