import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model';
import PointsApiService from './points-api-service';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';

const AUTHORIZATION = 'Basic ahsjdhi998hekhu';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

const containers = {
  tripInfoContainer: document.querySelector('.trip-main'),
  filterContainer: document.querySelector('.trip-controls__filters'),
  eventContainer: document.querySelector('.trip-events')
};
const addPointButton = document.querySelector('.trip-main__event-add-btn');

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);
const offersModel = new OffersModel(pointsApiService);
const destinationsModel = new DestinationsModel(pointsApiService);
const pointsModel = new PointsModel({pointsApiService, destinationsModel, offersModel});

const filterModel = new FilterModel();
const tripPresenter = new TripPresenter({pointsModel, offersModel, destinationsModel, filterModel, containers, addPointButton});
tripPresenter.init();
pointsModel.init();
