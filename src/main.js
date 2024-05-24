import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model';


const containers = {
  tripInfoContainer: document.querySelector('.trip-main'),
  filterContainer: document.querySelector('.trip-controls__filters'),
  eventContainer: document.querySelector('.trip-events')
};
const addPointButton = document.querySelector('.trip-main__event-add-btn');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter(pointsModel, filterModel, containers, addPointButton);
tripPresenter.init();
