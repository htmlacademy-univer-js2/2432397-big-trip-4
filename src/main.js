import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/points-model.js';

const pointsModel = new PointsModel();
const tripPresenter = new TripPresenter(pointsModel);
tripPresenter.init();
