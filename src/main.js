import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/points-model.js';


const containers = {
  tripInfoContainer: document.querySelector('.trip-main'),
  filterContainer: document.querySelector('.trip-controls__filters'),
  eventContainer: document.querySelector('.trip-events')
};


const pointsModel = new PointsModel();
const tripPresenter = new TripPresenter(pointsModel, containers);
tripPresenter.init();
